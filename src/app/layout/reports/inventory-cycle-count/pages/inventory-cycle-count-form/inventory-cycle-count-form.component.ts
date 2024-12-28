import { Component } from '@angular/core';
import {
  InventoryCycleCountDTO,
  inventoryCycleCountLabels,
} from '../../models';
import { countTypeOptions } from '../../models/inventory-count-type-options';
import { DateTime } from 'luxon';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {
  InventoryCycleCountApiService,
  InventoryCycleCountStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-cycle-count-form',
  templateUrl: './inventory-cycle-count-form.component.html',
  styleUrls: ['./inventory-cycle-count-form.component.scss'],
})
export class InventoryCycleCountFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderCountType: 'Tipo de conteo',
  };

  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';

  inventoryCycleCountLabels = inventoryCycleCountLabels;
  countTypeOptions = countTypeOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryCycleCount: InventoryCycleCountStateService,
    public _inventoryCycleCountApi: InventoryCycleCountApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();

    if (
      this.route.snapshot.queryParamMap.get('favorite') ||
      this.route.snapshot.queryParamMap.get('historic')
    ) {
      this.onManageFav();
    }
  }

  onFillForm() {
    this._inventoryCycleCount.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
      type: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryCycleCount.state.form.controls;
  }
  onSubmit() {
    this._inventoryCycleCount.state.isLoadingList = true;
    let item: InventoryCycleCountDTO = new InventoryCycleCountDTO();
    let formItems = this._inventoryCycleCount.state.form.value;

    const storesSelected = formItems.storeId
      .map((s: Store) => s.id)
      .join("','");

    item = {
      storeId: "'" + storesSelected + "'",
      startDate: formItems.startDate,
      endDate: formItems.endDate,
      type: formItems.type.value,
    };

    this._inventoryCycleCount.state.inventoryCycleCountDTO = item;

    this._inventoryCycleCountApi
      .inventoryCycleCountDTO(
        this._inventoryCycleCount.state.inventoryCycleCountDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryCycleCount.state.inventoryCycleCountResponse = data;
          this._inventoryCycleCount.state.inventoryCycleCountResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.errors.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryCycleCount.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores() {
    const filteredStores: Store[] = [];
    const stores: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter((x) => x.type === 'R');
      stores.push(...temp);
    }

    if (userRol.includes('staff-mayoreo')) {
      const temp = this.storeList.filter((x) => x.type === 'W');
      stores.push(...temp);
    }

    if (userRol.includes('sistemas')) {
      stores.push(...this.storeList);
    }

    this.suggestions = stores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/inventories/cycle-count'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      const typeSelect = countTypeOptions.filter(
        (o) => o.value === report.searchCriteria.type
      );

      let storeSelected = [];
      const stores = report.searchCriteria.storeId
        .replace(/["']/g, '')
        .split(',');

      for (const store of stores) {
        const temp = this.storeList.find((s) => s.id === store);
        if (temp !== undefined) storeSelected.push(temp);
      }

      this._inventoryCycleCount.state.form = this._formBuilder.group({
        storeId: [storeSelected],
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
        type: typeSelect[0],
      });

      this.onSubmit();
    }
  }

  // async onSelectRange() {
  //   let formItems = this._inventoryCycleCount.state.form.value;
  //   let from = DateTime.fromISO(formItems.startDate);
  //   let to = DateTime.fromISO(formItems.endDate);
  //   let diffDays = 0;
  //   if (from && to) {
  //     diffDays = from.diff(to, 'days').days;
  //     if (diffDays < -90) {
  //       await this.setErrorModal(
  //         'Error',
  //         'El rango supera el limite de 90 dias',
  //         '50px'
  //       );
  //     }
  //     if (diffDays > 0) {
  //       await this.setErrorModal(
  //         'Error',
  //         'La fecha final no puede ser menor a la fecha final',
  //         '50px'
  //       );
  //     }
  //   }
  // }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }
}
