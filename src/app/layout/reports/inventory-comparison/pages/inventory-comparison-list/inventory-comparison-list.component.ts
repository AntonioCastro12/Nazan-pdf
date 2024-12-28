import { Component } from '@angular/core';
import { InventoryComparisonStateService } from '../../services';
import { inventoryComparisonResponseName } from '../../models';

@Component({
  selector: 'inventory-comparison-list',
  templateUrl: './inventory-comparison-list.component.html',
  styleUrls: ['./inventory-comparison-list.component.scss'],
})
export class InventoryComparisonListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryComparisonResponseName = inventoryComparisonResponseName;

  searchText = '';

  constructor(public _inventoryComparison: InventoryComparisonStateService) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
