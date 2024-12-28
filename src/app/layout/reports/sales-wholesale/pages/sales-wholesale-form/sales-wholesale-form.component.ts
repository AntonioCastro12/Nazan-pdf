import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  SalesWholesaleApiService,
  SalesWholesaleStateService,
} from '../../services';
import { SalesWholesaleDTO, salesWholesaleLabels } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'sales-wholesale-form',
  templateUrl: './sales-wholesale-form.component.html',
  styleUrls: ['./sales-wholesale-form.component.scss'],
})
export class SalesWholesaleFormComponent {
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

  salesWholesaleLabels = salesWholesaleLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesWholesale: SalesWholesaleStateService,
    public _salesWholesaleApi: SalesWholesaleApiService,
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
    this._salesWholesale.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesWholesale.state.form.controls;
  }

  onSubmit() {
    this._salesWholesale.state.isLoadingList = true;
    let item: SalesWholesaleDTO = new SalesWholesaleDTO();
    let formItems = this._salesWholesale.state.form.value;
    const storesSelected = formItems.storeId
      .map((s: Store) => s.id)
      .join("','");

    item = {
      storeId: "'" + storesSelected + "'",
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._salesWholesale.state.salesWholesaleDTO = item;

    this._salesWholesaleApi
      .salesWholesalesList(this._salesWholesale.state.salesWholesaleDTO)
      .subscribe({
        next: (data) => {
          this._salesWholesale.state.salesWholesaleResponse = data;
          this._salesWholesale.state.salesWholesaleResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.errors.message);
          console.error(error);
        },
        complete: () => {
          this._salesWholesale.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores() {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter((x) => x.type === 'R');
      storeList.push(...temp);
    }

    if (userRol.includes('sistemas')) {
      storeList.push(...this.storeList);
    }

    if (userRol.includes('tienda')) {
      const temp = this.storeList.filter((store) => store.id === userStore);
      storeList.push(...temp);
    }

    this.suggestions = storeList;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/sales/wholesale-sales'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      let storeSelected = [];
      const stores = report.searchCriteria.storeId
        .replace(/["']/g, '')
        .split(',');

      for (const store of stores) {
        const temp = this.storeList.find((s) => s.id === store);
        if (temp !== undefined) storeSelected.push(temp);
      }

      this._salesWholesale.state.form = this._formBuilder.group({
        storeId: [storeSelected],
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
