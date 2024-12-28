import { Component } from '@angular/core';
import { salesWholesaleResponseName } from '../../models';
import { SalesWholesaleStateService } from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'sales-wholesale-list',
  templateUrl: './sales-wholesale-list.component.html',
  styleUrls: ['./sales-wholesale-list.component.scss'],
})
export class SalesWholesaleListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  salesWholesaleResponseName = salesWholesaleResponseName;

  searchText = '';

  constructor(public _salesWholesale: SalesWholesaleStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._salesWholesale.state.salesWholesaleResponse;
    this._salesWholesale.state.salesWholesaleResponseList = list.filter(
      (item) => objectContainsValue(item, this.searchText)
    );
  }
}
