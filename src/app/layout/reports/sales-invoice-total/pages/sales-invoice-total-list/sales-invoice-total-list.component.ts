import { Component } from '@angular/core';
import { SalesInvoiceTotalStateService } from '../../services';
import { salesInvoiceTotalResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'sales-invoice-total-list',
  templateUrl: './sales-invoice-total-list.component.html',
  styleUrls: ['./sales-invoice-total-list.component.scss'],
})
export class SalesInvoiceTotalListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  salesInvoiceTotalResponseName = salesInvoiceTotalResponseName;

  searchText = '';

  constructor(public _salesInvoiceTotal: SalesInvoiceTotalStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._salesInvoiceTotal.state.salesInvoiceTotalResponse;
    this._salesInvoiceTotal.state.salesInvoiceTotalResponseList = list.filter(
      (item) => objectContainsValue(item, this.searchText)
    );
  }
}
