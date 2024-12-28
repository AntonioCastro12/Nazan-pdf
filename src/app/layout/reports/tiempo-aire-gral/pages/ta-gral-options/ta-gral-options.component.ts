import { Component } from '@angular/core';

import { TaGralApiService, TaGralStateService } from '../../services';

import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ta-gral-options',
  templateUrl: './ta-gral-options.component.html',
  styleUrl: './ta-gral-options.component.scss'
})
export class TaGralOptionsComponent {

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
    public _taGralStateService: TaGralStateService,
    private _taGralApiService: TaGralApiService,
    private _toastr: ToastrService
  ) { }

  handleSearch() {
    this._taGralStateService.state.isVisibleForm =
      !this._taGralStateService.state.isVisibleForm;
  }
  handleChart() { }

  handleDownload() {
    const filename = `${ReportsExcelNames.TA_GENERAL}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    const { taGralResponse } = this._taGralStateService.state;
  
    // Convertir los datos de accountInformation en una hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(taGralResponse);
    
    // Añadir la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'AccountInformation');
  
    // Escribir el archivo
    XLSX.writeFile(wb, filename);
  }
  
}
