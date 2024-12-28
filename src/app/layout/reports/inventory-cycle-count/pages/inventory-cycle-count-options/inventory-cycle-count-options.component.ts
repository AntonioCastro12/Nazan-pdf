import { Component } from '@angular/core';
import {
  InventoryCycleCountApiService,
  InventoryCycleCountStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-cycle-count-options',
  templateUrl: './inventory-cycle-count-options.component.html',
  styleUrls: ['./inventory-cycle-count-options.component.scss'],
})
export class InventoryCycleCountOptionsComponent {
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
    public _inventoryCycleCount: InventoryCycleCountStateService,
    private _inventoryCycleCountApi: InventoryCycleCountApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventoryCycleCount.state.isVisibleForm =
      !this._inventoryCycleCount.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryCycleCount.state.isLoadingList = true;

    this._inventoryCycleCountApi
      .inventoryCycleCountDTO(
        this._inventoryCycleCount.state.inventoryCycleCountDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryCycleCount.state.inventoryCycleCountResponse = data;
          this._inventoryCycleCount.state.inventoryCycleCountResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryCycleCount.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.CUMPLIMIENTO_CONTEOS_CICLICOS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._inventoryCycleCount.state.inventoryCycleCountResponseList;
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
        storeId: this._inventoryCycleCount.state.inventoryCycleCountDTO.storeId,
        type: this._inventoryCycleCount.state.inventoryCycleCountDTO.type,
        startDate:
          this._inventoryCycleCount.state.inventoryCycleCountDTO.startDate,
        endDate: this._inventoryCycleCount.state.inventoryCycleCountDTO.endDate,
      },
      url: '/inventories/cycle-count',
    };

    this._inventoryCycleCountApi.favorite(data).subscribe({
      next: async () => {
        // await this.setErrorModal(
        //   'Completado',
        //   'Reporte agregado a favorito',
        //   '50px'
        // );
        this._toastr.success(
          'El reporte se ha agregado a favoritos sastifactoriamente'
        );
        this.isLoading = false;
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
