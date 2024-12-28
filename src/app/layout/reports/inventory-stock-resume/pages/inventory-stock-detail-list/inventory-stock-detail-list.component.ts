import { Component } from '@angular/core';
import { InventoryStockResumeStateService } from '../../services';
import { InventoryStockDetailResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';

@Component({
  selector: 'inventory-stock-detail-list',
  templateUrl: './inventory-stock-detail-list.component.html',
  styleUrls: ['./inventory-stock-detail-list.component.scss'],
})
export class InventoryStockDetailListComponent {
  inventoryStockDetailResponseName = InventoryStockDetailResponseName;

  searchTextDetails = '';
  isLoading: boolean = false;

  constructor(public _inventoryStockResume: InventoryStockResumeStateService) {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list = this._inventoryStockResume.state.inventoryStockResumeResponse;
    this._inventoryStockResume.state.inventoryStockResumeResponseList =
      list.filter((item) => objectContainsValue(item, this.searchTextDetails));
  }

  exportDetailsExcel() {
    const filename = `${
      ReportsExcelNames.EXISTENCIA_DE_INVENTARIO_DETALLE_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._inventoryStockResume.state.inventoryStockDetailResponseList;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, filename);
  }
}
