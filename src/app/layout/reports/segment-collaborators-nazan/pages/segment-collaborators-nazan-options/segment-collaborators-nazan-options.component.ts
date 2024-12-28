import { Component } from '@angular/core';
import {
  SegmentCollaboratorsNazanApiService,
  SegmentCollaboratorsNazanStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'segment-collaborators-nazan-options',
  templateUrl: './segment-collaborators-nazan-options.component.html',
  styleUrls: ['./segment-collaborators-nazan-options.component.scss'],
})
export class SegmentCollaboratorsNazanOptionsComponent {
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
    public _segmentCollaboratorsNazan: SegmentCollaboratorsNazanStateService,
    private _segmentCollaboratorsNazanApi: SegmentCollaboratorsNazanApiService,
    private _toastr: ToastrService
  ) {}

  handleSearch() {
    this._segmentCollaboratorsNazan.state.isVisibleForm =
      !this._segmentCollaboratorsNazan.state.isVisibleForm;
  }
  handleChart() {}
  handleRefresh() {
    this._segmentCollaboratorsNazan.state.isLoadingList = true;

    this._segmentCollaboratorsNazanApi.SegmentCollaboratorsList().subscribe({
      next: (data) => {
        this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponse =
          data;
        this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponseList =
          data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this._segmentCollaboratorsNazan.state.isLoadingList = false;
      },
    });
  }

  handleDownload() {
    const filename = `${
      ReportsExcelNames.SEGMENTOS_COLABORADORES_NAZAN_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

    /* pass here the table id */
    let element =
      this._segmentCollaboratorsNazan.state
        .segmentCollaboratorsNazanResponseList;
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
      searchCriteria: {},
      url: '/segments/collaborators-nazan',
    };

    this._segmentCollaboratorsNazanApi.favorite(data).subscribe({
      next: async () => {
        // await this.setErrorModal(
        //   'Completado',
        //   'Reporte agregado a favorito',
        //   '50px'
        // );
        this.isLoading = false;
        this._toastr.error('Opps ha ocurrido un error');
      },
      error: (e) => {
        console.error('error loading data', e);
        this._toastr.error('Opps ha ocurrido un error', e.erros.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
