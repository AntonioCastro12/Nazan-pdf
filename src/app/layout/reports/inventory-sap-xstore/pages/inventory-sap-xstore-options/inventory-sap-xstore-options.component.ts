import { Component } from '@angular/core';
import {
  InventorySapXstoreApiService,
  InventorySapXstoreApstateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-sap-xstore-options',
  templateUrl: './inventory-sap-xstore-options.component.html',
  styleUrls: ['./inventory-sap-xstore-options.component.scss'],
})
export class InventorySapXstoreOptionsComponent {
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
    public _inventorySapXstoreApstate: InventorySapXstoreApstateService,
    private _inventorySapXstoreApi: InventorySapXstoreApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventorySapXstoreApstate.state.isVisibleForm =
      !this._inventorySapXstoreApstate.state.isVisibleForm;
  }
  handleChart() {}

  handleRefresh() {
    this._inventorySapXstoreApstate.state.isLoadingList = true;

    this._inventorySapXstoreApi
      .inventorySapXstore(
        this._inventorySapXstoreApstate.state.inventorySapXstoreDTO
      )
      .subscribe({
        next: (data) => {
          this._inventorySapXstoreApstate.state.inventorySapXstoreResponse =
            data;
          this._inventorySapXstoreApstate.state.inventorySapXstoreResponseList =
            data;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this._inventorySapXstoreApstate.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.DIFERENCIA_DE_INVENTARIO_SAP_VS_XSTORE_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._inventorySapXstoreApstate.state.inventorySapXstoreResponseList;
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
        storeId:
          this._inventorySapXstoreApstate.state.inventorySapXstoreDTO.storeId,
      },
      url: '/inventories/sap-xstore',
    };

    this._inventorySapXstoreApi.favorite(data).subscribe({
      next: async () => {
        // await this.setErrorModal(
        //   'Completado',
        //   'Reporte agregado a favorito',
        //   '50px'
        // );
        this.isLoading = false;
      },
      error: (error) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
