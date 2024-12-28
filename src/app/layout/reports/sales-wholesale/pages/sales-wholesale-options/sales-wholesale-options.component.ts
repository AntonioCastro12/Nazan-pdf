import { Component } from '@angular/core';
import {
  SalesWholesaleApiService,
  SalesWholesaleStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-wholesale-options',
  templateUrl: './sales-wholesale-options.component.html',
  styleUrls: ['./sales-wholesale-options.component.scss'],
})
export class SalesWholesaleOptionsComponent {
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
    public _salesWholesale: SalesWholesaleStateService,
    private _salesWholesaleApi: SalesWholesaleApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._salesWholesale.state.isVisibleForm =
      !this._salesWholesale.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesWholesale.state.isLoadingList = true;

    this._salesWholesaleApi
      .salesWholesalesList(this._salesWholesale.state.salesWholesaleDTO)
      .subscribe({
        next: (data) => {
          this._salesWholesale.state.salesWholesaleResponse = data;
          this._salesWholesale.state.salesWholesaleResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.error.message);
          console.error(error);
        },
        complete: () => {
          this._salesWholesale.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.VENTA_DE_MAYOREOS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = this._salesWholesale.state.salesWholesaleResponseList;
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
        storeId: this._salesWholesale.state.salesWholesaleDTO.storeId,
        startDate: this._salesWholesale.state.salesWholesaleDTO.startDate,
        endDate: this._salesWholesale.state.salesWholesaleDTO.endDate,
      },
      url: '/sales/wholesale-sales',
    };

    this._salesWholesaleApi.favorite(data).subscribe({
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
