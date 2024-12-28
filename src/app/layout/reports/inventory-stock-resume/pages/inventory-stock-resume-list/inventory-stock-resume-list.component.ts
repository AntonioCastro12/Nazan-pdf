import { Component } from '@angular/core';
import {
  InventoryStockResumeApiService,
  InventoryStockResumeStateService,
} from '../../services';
import { inventoryStockResumeResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'inventory-stock-resume-list',
  templateUrl: './inventory-stock-resume-list.component.html',
  styleUrls: ['./inventory-stock-resume-list.component.scss'],
})
export class InventoryStockResumeListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  inventoryStockResumeResponseName = inventoryStockResumeResponseName;

  searchText = '';
  isLoading: boolean = false;

  constructor(
    public _inventoryStockResume: InventoryStockResumeStateService,
    public _inventoryStockResumeApi: InventoryStockResumeApiService
  ) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventoryStockResume.state.inventoryStockResumeResponse;
    this._inventoryStockResume.state.inventoryStockResumeResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }

  async findDetails() {
    this.isLoading = true;
    this._inventoryStockResumeApi
      .inventoryStockDetails(
        this._inventoryStockResume.state.inventoryStockResumeDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryStockResume.state.inventoryStockDetailResponse = data;
          this._inventoryStockResume.state.inventoryStockDetailResponseList =
            data;
        },
        error: (e) => {
          console.error('error loading data', e);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  async showDetails() {
    this._inventoryStockResume.state.isVisibleModal = true;
  }
}
