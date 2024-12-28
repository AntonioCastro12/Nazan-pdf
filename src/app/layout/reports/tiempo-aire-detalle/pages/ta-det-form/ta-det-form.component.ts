import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { DateTime } from 'luxon';

import {
  TaDetApiService,
  TaDetStateService,
} from '../../services';

import { taDetDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'ta-det-form',
  templateUrl: './ta-det-form.component.html',
  styleUrl: './ta-det-form.component.scss'
})
export class TaDetFormComponent {

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taDetStateService: TaDetStateService,
    public _taServiceApi: TaDetApiService,
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
    this._taDetStateService.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taDetStateService.state.form.controls;
  }

  socioSubmit() {
    let formItems = this._taDetStateService.state.form.value;
    this._taDetStateService.state.isLoadingList = true;
    let item: taDetDTO = new taDetDTO();
    item = {
      storeId: formItems.storeId.id,
      // storeId: '105',
      startDate: formItems.startDate.replace(/-/g, ""),
      endDate: formItems.endDate.replace(/-/g, "")
    }
    this._taDetStateService.state.taDetDTO = item;
    console.log("item: ", this._taDetStateService.state.taDetDTO);

    this._taServiceApi.getTaDet(this._taDetStateService.state.taDetDTO).subscribe({
      next: (data: any) => {

        console.log("Data recibida: ", data.resume);
        this._taDetStateService.state.taDetResponse=data.resume;
        this._taDetStateService.state.taDetResponse.forEach(transaccion => {
          transaccion.business_date = transaccion.business_date?.split('T')[0];
        });

        console.log("data en servicio: ", this._taDetStateService.state.taDetResponse);
        

      },
      error: (error: { erros: { message: string | undefined; }; }) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this._taDetStateService.state.isLoadingList = false;
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
