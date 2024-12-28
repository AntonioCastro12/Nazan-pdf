import { Component } from '@angular/core';
import {
  SalesInvoiceTotalApiService,
  SalesInvoiceTotalStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-invoice-total-options',
  templateUrl: './sales-invoice-total-options.component.html',
  styleUrls: ['./sales-invoice-total-options.component.scss'],
})
export class SalesInvoiceTotalOptionsComponent {
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
    public _salesInvoiceTotal: SalesInvoiceTotalStateService,
    private _salesInvoiceTotalApi: SalesInvoiceTotalApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._salesInvoiceTotal.state.isVisibleForm =
      !this._salesInvoiceTotal.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesInvoiceTotal.state.isLoadingList = true;

    this._salesInvoiceTotalApi
      .invoiceTotalList(this._salesInvoiceTotal.state.salesInvoiceTotalDTO)
      .subscribe({
        next: (data) => {
          this._salesInvoiceTotal.state.salesInvoiceTotalResponse = data;
          this._salesInvoiceTotal.state.salesInvoiceTotalResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._salesInvoiceTotal.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.TOTALES_DE_FACTURACION_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = this._salesInvoiceTotal.state.salesInvoiceTotalResponseList;
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
        storeId: this._salesInvoiceTotal.state.salesInvoiceTotalDTO.storeId,
        startDate: this._salesInvoiceTotal.state.salesInvoiceTotalDTO.startDate,
        endDate: this._salesInvoiceTotal.state.salesInvoiceTotalDTO.endDate,
      },
      url: '/sales/invoice-total',
    };

    this._salesInvoiceTotalApi.favorite(data).subscribe({
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
