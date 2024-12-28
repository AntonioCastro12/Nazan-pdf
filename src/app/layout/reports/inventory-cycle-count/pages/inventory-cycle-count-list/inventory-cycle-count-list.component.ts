import { Component } from '@angular/core';
import { InventoryCycleCountStateService } from '../../services';
import { inventoryCycleCountResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-cycle-count-list',
  templateUrl: './inventory-cycle-count-list.component.html',
  styleUrls: ['./inventory-cycle-count-list.component.scss'],
})
export class InventoryCycleCountListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryCycleCountResponseName = inventoryCycleCountResponseName;

  searchText = '';

  constructor(public _inventoryCycleCount: InventoryCycleCountStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventoryCycleCount.state.inventoryCycleCountResponse;
    this._inventoryCycleCount.state.inventoryCycleCountResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
