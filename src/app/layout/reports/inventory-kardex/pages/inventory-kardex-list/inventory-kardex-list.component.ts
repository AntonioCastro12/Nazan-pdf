import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';
import { KardexProductResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-kardex-list',
  templateUrl: './inventory-kardex-list.component.html',
  styleUrls: ['./inventory-kardex-list.component.scss'],
})
export class InventoryKardexListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  KardexProductResponseName = KardexProductResponseName;

  searchText = '';

  constructor(public _inventoryKardex: InventoryKardexStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventoryKardex.state.kardexProductResponse;
    this._inventoryKardex.state.kardexProductResponseList = list.filter(
      (item) => objectContainsValue(item, this.searchText)
    );
  }
}
