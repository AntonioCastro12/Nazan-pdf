import { Component } from '@angular/core';
import {
  PointProgramTotalMovementApiService,
  PointProgramTotalMovementStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-total-movement-options',
  templateUrl: './point-program-total-movement-options.component.html',
  styleUrls: ['./point-program-total-movement-options.component.scss'],
})
export class PointProgramTotalMovementOptionsComponent {
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
    public _pointProgramTotalMovement: PointProgramTotalMovementStateService,
    private _pointProgramTotalMovementApi: PointProgramTotalMovementApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._pointProgramTotalMovement.state.isVisibleForm =
      !this._pointProgramTotalMovement.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramTotalMovement.state.isLoadingList = true;

    this._pointProgramTotalMovementApi
      .pointProgramTotalMovement(
        this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponse =
            data;
          this._pointProgramTotalMovement.state.pointProgramTotalMovementResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramTotalMovement.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.REPORTE_TOTALES_MOVIMIENTO_PUNTOS_Y_MONEDERO_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._pointProgramTotalMovement.state
        .pointProgramTotalMovementResponseList;
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
          this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO
            .startDate,
        endDate:
          this._pointProgramTotalMovement.state.pointProgramTotalMovementDTO
            .endDate,
      },
      url: '/point-program/total-movement',
    };

    this._pointProgramTotalMovementApi.favorite(data).subscribe({
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
