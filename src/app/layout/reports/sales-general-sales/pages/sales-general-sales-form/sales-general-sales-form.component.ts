import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import { SalesGeneralSalesDTO, salesGeneralSalesLabels } from '../../models';
import {
  SalesGeneralSalesApiService,
  SalesGeneralSalesStateService,
} from '../../services';
import { SalesGeneralSalesActionService } from '../../services/sales-general-sales-action.service';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'sales-general-sales-form',
  templateUrl: './sales-general-sales-form.component.html',
  styleUrls: ['./sales-general-sales-form.component.scss'],
})
export class SalesGeneralSalesFormComponent {
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

  salesGeneralSalesLabels = salesGeneralSalesLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesGeneralSales: SalesGeneralSalesStateService,
    public _salesGeneralSalesAction: SalesGeneralSalesActionService,
    private route: ActivatedRoute,
    public _common: CommonStateService
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
    this._salesGeneralSales.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      businessDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesGeneralSales.state.form.controls;
  }

  onSubmit() {
    this._salesGeneralSales.state.isLoadingList = true;
    let item: SalesGeneralSalesDTO = new SalesGeneralSalesDTO();
    let formItems = this._salesGeneralSales.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      businessDate: formItems.businessDate,
    };
    this._salesGeneralSales.state.salesGeneralSalesDTO = item;

    this._salesGeneralSalesAction.onGetList(item);
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const stores: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('sistemas') || userRol.includes('staff-ingresos')) {
      stores.push(...this.storeList);
    }

    for (const store of stores) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/sales/general-sales'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      const selectedStore = this.storeList.find(
        (item) => item.id === report.searchCriteria.storeId
      );

      this._salesGeneralSales.state.form = this._formBuilder.group({
        storeId: selectedStore,
        businessDate: report.searchCriteria.businessDate,
      });

      this.onSubmit();
    }
  }
}
