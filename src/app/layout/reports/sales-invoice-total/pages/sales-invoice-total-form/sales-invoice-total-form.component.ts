import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import { SalesInvoiceTotalDTO, salesInvoiceTotalLabels } from '../../models';
import {
  SalesInvoiceTotalApiService,
  SalesInvoiceTotalStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'sales-invoice-total-form',
  templateUrl: './sales-invoice-total-form.component.html',
  styleUrls: ['./sales-invoice-total-form.component.scss'],
})
export class SalesInvoiceTotalFormComponent {
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

  salesInvoiceTotalLabels = salesInvoiceTotalLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _salesInvoiceTotal: SalesInvoiceTotalStateService,
    public _salesInvoiceTotalApi: SalesInvoiceTotalApiService,
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
    this._salesInvoiceTotal.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._salesInvoiceTotal.state.form.controls;
  }
  onSubmit() {
    this._salesInvoiceTotal.state.isLoadingList = true;
    let item: SalesInvoiceTotalDTO = new SalesInvoiceTotalDTO();
    let formItems = this._salesInvoiceTotal.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._salesInvoiceTotal.state.salesInvoiceTotalDTO = item;

    this._salesInvoiceTotalApi
      .invoiceTotalList(this._salesInvoiceTotal.state.salesInvoiceTotalDTO)
      .subscribe({
        next: (data) => {
          this._salesInvoiceTotal.state.salesInvoiceTotalResponse = data;
          this._salesInvoiceTotal.state.salesInvoiceTotalResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._salesInvoiceTotal.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    for (const store of this.storeList) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/sales/invoice-total'
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

      this._salesInvoiceTotal.state.form = this._formBuilder.group({
        storeId: selectedStore,
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
