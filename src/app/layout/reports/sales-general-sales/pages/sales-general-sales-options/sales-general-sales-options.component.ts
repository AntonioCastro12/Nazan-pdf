import { Component } from '@angular/core';
import { SalesGeneralSalesStateService } from '../../services';
import { SalesGeneralSalesActionService } from '../../services/sales-general-sales-action.service';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sales-general-sales-options',
  templateUrl: './sales-general-sales-options.component.html',
  styleUrls: ['./sales-general-sales-options.component.scss'],
})
export class SalesGeneralSalesOptionsComponent {
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
    public _salesGeneralSales: SalesGeneralSalesStateService,
    private _salesGeneralSalesAction: SalesGeneralSalesActionService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._salesGeneralSales.state.isVisibleForm =
      !this._salesGeneralSales.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._salesGeneralSales.state.isLoadingList = true;

    this._salesGeneralSalesAction.onGetList(
      this._salesGeneralSales.state.salesGeneralSalesDTO
    );
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.INFORME_GENERAL_DE_VENTAS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element = [
      ...this._salesGeneralSales.state.salesGeneralSalesResponse,
      ...this._salesGeneralSales.state.salesGeneralSalesResponsePayFormsList,
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
        storeId: this._salesGeneralSales.state.salesGeneralSalesDTO.storeId,
        businessDate:
          this._salesGeneralSales.state.salesGeneralSalesDTO.businessDate,
      },
      url: '/sales/general-sales',
    };

    this._salesGeneralSalesAction._salesGeneralSalesApi
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
