import { Component } from '@angular/core';
import {
  PointProgramDetailPointsApiService,
  PointProgramDetailPointsStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'point-program-detail-points-options',
  templateUrl: './point-program-detail-points-options.component.html',
  styleUrls: ['./point-program-detail-points-options.component.scss'],
})
export class PointProgramDetailPointsOptionsComponent {
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
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService,
    private _pointProgramDetailPointsApi: PointProgramDetailPointsApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._pointProgramDetailPoints.state.isVisibleForm =
      !this._pointProgramDetailPoints.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._pointProgramDetailPoints.state.isLoadingList = true;

    this._pointProgramDetailPointsApi
      .detailPointsList(
        this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
      )
      .subscribe({
        next: (data) => {
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponse =
            data;
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramDetailPoints.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.REPORTE_DETALLE_MOVIMIENTOS_PUNTO_Y_PREMIOS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList;
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
          this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
            .startDate,
        endDate:
          this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
            .endDate,
      },
      url: '/point-program/detail-points',
    };

    this._pointProgramDetailPointsApi.favorite(data).subscribe({
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
