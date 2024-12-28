import { Component } from '@angular/core';
import {
  SegmentAffiliatedKiponApiService,
  SegmentAffiliatedKiponStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'segment-affiliated-kipon-options',
  templateUrl: './segment-affiliated-kipon-options.component.html',
  styleUrls: ['./segment-affiliated-kipon-options.component.scss'],
})
export class SegmentAffiliatedKiponOptionsComponent {
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
    public _segmentAffiliatedKipon: SegmentAffiliatedKiponStateService,
    private _segmentAffiliatedKiponApi: SegmentAffiliatedKiponApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._segmentAffiliatedKipon.state.isVisibleForm =
      !this._segmentAffiliatedKipon.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._segmentAffiliatedKipon.state.isLoadingList = true;

    this._segmentAffiliatedKiponApi
      .segmentAffiliatedKiponList(
        this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO
      )
      .subscribe({
        next: (data) => {
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponse =
            data;
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.errors.message);
          console.error(error);
        },
        complete: () => {
          this._segmentAffiliatedKipon.state.isLoadingList = false;
        },
      });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.AFILIADOS_CLUP_KIPON_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponseList;
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
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO.storeId,
        startDate:
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO
            .startDate,
        endDate:
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO.endDate,
      },
      url: '/segments/affiliated-kipon',
    };

    this._segmentAffiliatedKiponApi.favorite(data).subscribe({
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
