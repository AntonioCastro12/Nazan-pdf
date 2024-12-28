import { Component } from '@angular/core';
import { InventorySapXstoreApstateService } from '../../services';
import { inventorySapXstoreResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-sap-xstore-list',
  templateUrl: './inventory-sap-xstore-list.component.html',
  styleUrls: ['./inventory-sap-xstore-list.component.scss'],
})
export class InventorySapXstoreListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventorySapXstoreResponseName = inventorySapXstoreResponseName;

  searchText = '';

  constructor(public _inventorySapXstoreAp: InventorySapXstoreApstateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventorySapXstoreAp.state.inventorySapXstoreResponse;
    this._inventorySapXstoreAp.state.inventorySapXstoreResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
