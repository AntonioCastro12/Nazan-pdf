import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { inventoryUploadLabels, Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { InventoryUploadStateService } from '../../services/inventory-upload-state.service';
import { InventoryUploadApiService } from '../../services/inventory-upload-api.service';
import { CommonStateService } from '@report-manager/services';
import { ToastrService } from 'ngx-toastr';
import CSVFileValidator from 'csv-file-validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'inventory-upload-form',
  templateUrl: './inventory-upload-form.component.html',
  styleUrls: ['./inventory-upload-form.component.scss'],
})
export class InventoryUploadFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Reiniciar formulario',
    labelSave: 'Cargar Archivo',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  inventoryUploadLabels = inventoryUploadLabels;

  message: string = '';
  fileToUpload!: File;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryUpload: InventoryUploadStateService,
    public _inventoryUploadApi: InventoryUploadApiService,
    public _common: CommonStateService,
    private _toastr: ToastrService,
    private _http: HttpClient
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryUpload.state.form = this._formBuilder.group({
      file: [null, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryUpload.state.form.controls;
  }
  onSubmit() {
    this._inventoryUpload.state.isLoadingList = true;
    const formData = new FormData();

    formData.append('file', this.fileToUpload);
    const upload$ = this._http.post(
      'https://surtidoresv2api.impuls.com.mx/api/procesarArchivoRelacionados',
      formData
    );

    upload$.subscribe({
      next: (data: any) => {
        this._inventoryUpload.state.isLoadingList = false;
        this._toastr.success('Archivo cargado correctamente');
        this.message = 'Archivo cargado correctamente';
        this._inventoryUpload.state.form.reset();
      },
      error: (error) => {
        console.error(error);
        this._inventoryUpload.state.isLoadingList = false;
        this._toastr.error('Opps, ocurrió un error en la carga del archivo');
        this.message = 'Opps, ocurrió un error en la carga del archivo';
      },
      complete: () => {
        this._inventoryUpload.state.isLoadingList = false;
        return;
      },
    });
  }

  onReset() {
    this.onFillForm();
    this.message = '';
  }

  handleFileInput($event: any) {
    this._inventoryUpload.state.isLoadingList = true;
    this.message = '';
    const CsvValidateaRules = {
      headers: [
        {
          name: 'tienda',
          inputName: 'tienda',
          required: true,
        },
        {
          name: 'generico',
          inputName: 'generico',
          required: true,
        },
        {
          name: 'oferta',
          inputName: 'oferta',
          required: true,
        },
        {
          name: 'generico_espejo',
          inputName: 'generico_espejo',
          required: true,
        },
        {
          name: 'base',
          inputName: 'base',
          required: true,
        },
        {
          name: 'prioridad',
          inputName: 'prioridad',
          required: true,
        },
        {
          name: 'orden',
          inputName: 'orden',
          required: true,
        },
      ], // required
      isHeaderNameOptional: false, // default (optional)
      isColumnIndexAlphabetic: false, // default (optional)
    };
    let file = $event.target.files.item(0);
    this.fileToUpload = $event.target.files[0];
    this.message = `Se está cargando y validando el archivo: ${file.name}`;
    CSVFileValidator(file, CsvValidateaRules)
      .then((csvData) => {
        csvData.data; // Array of objects from file
        csvData.inValidData; // Array of error messages
        if (csvData.inValidData.length) {
          this._inventoryUpload.state.isLoadingList = false;
          this._toastr.error(
            `El archivo ${file.name} contiene errores, favor validar y volver a cargarlo`
          );
          this.message = `El archivo ${file.name} contiene errores, favor validar y volver a cargarlo`;
          this._inventoryUpload.state.form.patchValue({
            file: null,
          });
        } else {
          this._inventoryUpload.state.isLoadingList = false;
          this._toastr.success(
            `El archivo ${file.name} fué validado correctamente`
          );
          this.message = `El archivo ${file.name} fué validado correctamente`;
          this._inventoryUpload.state.form.patchValue({
            file: file,
          });
        }
      })
      .catch((err) => {});
  }
}
