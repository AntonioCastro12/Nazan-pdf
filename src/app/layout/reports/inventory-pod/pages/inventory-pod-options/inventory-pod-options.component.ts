import { Component } from '@angular/core';
import {
  InventoryPodApiService,
  InventoryPodStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-pod-options',
  templateUrl: './inventory-pod-options.component.html',
  styleUrls: ['./inventory-pod-options.component.scss'],
})
export class InventoryPodOptionsComponent {
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
    public _inventoryPod: InventoryPodStateService,
    private _inventoryPodApi: InventoryPodApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._inventoryPod.state.isVisibleForm =
      !this._inventoryPod.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._inventoryPod.state.isLoadingList = true;

    this._inventoryPodApi
      .inventoryPod(this._inventoryPod.state.inventoryPodDTO)
      .subscribe({
        next: (data) => {
          this._inventoryPod.state.inventoryPodResponse = data;
          this._inventoryPod.state.inventoryPodResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryPod.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.REPORTE_DE_RECEPCION_DE_MERCANCIA_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = this._inventoryPod.state.inventoryPodResponseList;
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
        storeId: this._inventoryPod.state.inventoryPodDTO.storeId,
        days: this._inventoryPod.state.inventoryPodDTO.days,
      },
      url: '/inventories/pod',
    };

    this._inventoryPodApi.favorite(data).subscribe({
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
