import { Component } from '@angular/core';
import { SalesSearchDeliveredStateService } from '../../services';
import { SalesSearchDeliveredActionService } from '../../services/sales-search-delivered-action.service';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-search-delivered-options',
  templateUrl: './sales-search-delivered-options.component.html',
  styleUrls: ['./sales-search-delivered-options.component.scss'],
})
export class SalesSearchDeliveredOptionsComponent {
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
    public _SalesSearchDelivered: SalesSearchDeliveredStateService,
    private _SalesSearchDeliveredAction: SalesSearchDeliveredActionService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._SalesSearchDelivered.state.isVisibleForm =
      !this._SalesSearchDelivered.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._SalesSearchDelivered.state.isLoadingList = true;

    this._SalesSearchDeliveredAction.onGetList(
      this._SalesSearchDelivered.state.SalesSearchDeliveredDTO
    );
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.INFORME_GENERAL_DE_VENTAS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = [
      ...this._SalesSearchDelivered.state.SalesSearchDeliveredResponse,
      ...this._SalesSearchDelivered.state.SalesSearchDeliveredResponseOnTheWay,
    ];
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
        cardNumber:
          this._SalesSearchDelivered.state.SalesSearchDeliveredDTO.storeId,
      },
      url: '/sales/products-delivered',
    };

    this._SalesSearchDeliveredAction._SalesSearchDeliveredApi
      .favorite(data)
      .subscribe({
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
