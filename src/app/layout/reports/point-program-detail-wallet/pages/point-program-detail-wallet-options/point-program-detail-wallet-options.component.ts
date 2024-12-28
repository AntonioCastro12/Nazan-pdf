import { Component } from '@angular/core';
import {
  PointProgramDetailWalletApiService,
  PointProgramDetailWalletStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-detail-wallet-options',
  templateUrl: './point-program-detail-wallet-options.component.html',
  styleUrls: ['./point-program-detail-wallet-options.component.scss'],
})
export class PointProgramDetailWalletOptionsComponent {
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
    public _pointProgramDetailWallet: PointProgramDetailWalletStateService,
    private _pointProgramDetailWalletApi: PointProgramDetailWalletApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._pointProgramDetailWallet.state.isVisibleForm =
      !this._pointProgramDetailWallet.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramDetailWallet.state.isLoadingList = true;

    this._pointProgramDetailWalletApi
      .detailWalletList(
        this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponse =
            data;
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramDetailWallet.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.REPORTE_DETALLE_MOVIMIENTOS_MONEDERO_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList;
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
        startDate:
          this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
            .startDate,
        endDate:
          this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
            .endDate,
      },
      url: '/point-program/detail-wallet',
    };

    this._pointProgramDetailWalletApi.favorite(data).subscribe({
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
