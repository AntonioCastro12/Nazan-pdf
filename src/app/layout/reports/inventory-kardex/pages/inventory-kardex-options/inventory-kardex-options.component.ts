import { Component } from '@angular/core';
import { InventoryKardexStateService } from '../../services';
import { InventoryKardexApiService } from '../../services/inventory-kardex-api.service';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-kardex-options',
  templateUrl: './inventory-kardex-options.component.html',
  styleUrls: ['./inventory-kardex-options.component.scss'],
})
export class InventoryKardexOptionsComponent {
  TEMPLATE_TEXT = {
    showSearch: 'Buscar los registros',
    showChart: 'Ver gráfico',
    showRefresh: 'Renovar la lista',
    showDownload: 'Exportar registros',
    showEye: 'Mostrar registro',
    showFavorite: 'Agregar a favoritos',
    title: 'Herramientas de reporte',
  };

  showSearch: any = true;
  showChart: any = true;
  showRefresh: any = true;
  showDownload: any = true;
  showEye: any = true;
  showFavorite: any = true;
  isLoading: boolean = false;

  constructor(
    public _inventoryKardex: InventoryKardexStateService,
    private _inventoryKardexApi: InventoryKardexApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventoryKardex.state.isVisibleForm =
      !this._inventoryKardex.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryKardex.state.isLoadingList = true;

    this._inventoryKardexApi
      .inventoryKardexProduct(this._inventoryKardex.state.kardexProductDTO)
      .subscribe({
        next: (data) => {
          this._inventoryKardex.state.kardexProductResponse = data;
          this._inventoryKardex.state.kardexProductResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryKardex.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.KARDEX_DE_ARTICULO_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = this._inventoryKardex.state.kardexProductResponseList;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, filename);
  }

  handleFavorite() {
    this.isLoading = true;
    const data: any = {
      searchCriteria: {
        storeId: this._inventoryKardex.state.kardexProductDTO.storeId,
        productId: this._inventoryKardex.state.kardexProductDTO.productId,
        origin: this._inventoryKardex.state.kardexProductDTO.origin,
        startDate: this._inventoryKardex.state.kardexProductDTO.startDate,
        endDate: this._inventoryKardex.state.kardexProductDTO.endDate,
      },
      url: '/inventories/kardex-product',
    };

    this._inventoryKardexApi.favorite(data).subscribe({
      next: async () => {
        // await this.setErrorModal(
        //   'Completado',
        //   'Reporte agregado a favorito',
        //   '50px'
        // );
        this.isLoading = false;
        this._toastr.success(
          'El reporte se ha agregado a favoritos sastifactoriamente'
        );
      },
      error: (e) => {
        console.error('error loading data', e);
        this._toastr.error('Opps ha ocurrido un error', e.erros.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
