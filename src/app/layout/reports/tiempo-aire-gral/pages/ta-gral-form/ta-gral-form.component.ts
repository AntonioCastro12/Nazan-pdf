import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { DateTime } from 'luxon';

import {
  TaGralApiService,
  TaGralStateService,
} from '../../services';

import { taGralDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'ta-gral-form',
  templateUrl: './ta-gral-form.component.html',
  styleUrl: './ta-gral-form.component.scss'
})
export class TaGralFormComponent {

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taGralStateService: TaGralStateService,
    public _taServiceApi: TaGralApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  value = "";

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }

  socioSubmit() {
    let formItems = this._taGralStateService.state.form.value;
    this._taGralStateService.state.isLoadingList = true;
    let item: taGralDTO = new taGralDTO();
    item = {
      storeId: formItems.storeId.id,
      // storeId: '105',
      startDate: formItems.startDate.replace(/-/g, ""),
      endDate: formItems.endDate.replace(/-/g, "")
    }
    this._taGralStateService.state.taGralDTO = item;
    console.log("item: ", this._taGralStateService.state.taGralDTO);

    this._taServiceApi.getTaGral(this._taGralStateService.state.taGralDTO).subscribe({
      next: (data: any) => {

        console.log("Data recibida: ", data.resume);
        this._taGralStateService.state.taGralResponse=data.resume;
        this._taGralStateService.state.taGralResponse.forEach(transaccion => {
          transaccion.business_date = transaccion.business_date?.split('T')[0];
        });

        console.log("data en servicio: ", this._taGralStateService.state.taGralResponse);
        

      },
      error: (error: { erros: { message: string | undefined; }; }) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this._taGralStateService.state.isLoadingList = false;
      },
    });
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('tienda')) {
      const temp = this.storeList.filter((store) => store.id === userStore);
      storeList.push(...temp);
    }

    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter((x) => x.type === 'R');
      storeList.push(...temp);
    }

    if (userRol.includes('staff-mayoreo')) {
      const temp = this.storeList.filter((x) => x.type === 'W');
      storeList.push(...temp);
    }

    if (
      userRol.includes('sistemas') ||
      userRol.includes('staff-inventarios-ost') ||
      userRol.includes('staff-planeacion')
    ) {
      storeList.push(...this.storeList);
    }

    for (const store of storeList) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onReset() {
    this.onFillForm();
  }

}
