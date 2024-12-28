import { Component } from '@angular/core';

import {
  CreditoApiService,
  CreditoStateService,
} from '../../services';
import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { ReportsExcelNames } from '@report-manager/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'credit-options',
  templateUrl: './credit-options.component.html',
  styleUrls: ['./credit-options.component.scss']
})
export class CreditOptionsComponent {

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
    public _creditoStateService: CreditoStateService,
    private _inventoryStockResumeApi: CreditoApiService,
    private _toastr: ToastrService
  ) { }

  handleSearch() {
    this._creditoStateService.state.isVisibleForm =
      !this._creditoStateService.state.isVisibleForm;
  }
  handleChart() { }
  handleRefresh() {
    // this._creditoStateService.state.isLoadingList = true;

    // this._inventoryStockResumeApi
    //   .inventoryStockResume(
    //     this._creditoStateService.state.inventoryStockResumeDTO
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this._creditoStateService.state.inventoryStockResumeResponse = data;
    //       this._creditoStateService.state.inventoryStockResumeResponseList =
    //         data;
    //     },
    //     error: (error) => {
    //       this._toastr.error('Opps ha ocurrido un error', error.erros.message);
    //       console.log(error);
    //     },
    //     complete: () => {
    //       this._creditoStateService.state.isLoadingList = false;
    //     },
    //   });
  }


  // handleDownload() {
  //   const filename = `${ReportsExcelNames.CREDITO_DE_SOCIOS}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;

  //   // Generar workbook
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();

  //   // Obtener elementos del estado
  //   const { customerInformationResponse, accountInformation, transactionsHistoryResponse } = this._creditoStateService.state;

  //   // Crear arreglo de elementos
  //   const elements = [customerInformationResponse, accountInformation, transactionsHistoryResponse];

  //   // Generar hojas en el workbook
  //   elements.forEach((element, index) => {
  //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
  //     XLSX.utils.book_append_sheet(wb, ws, `Sheet${index + 1}`);
  //   });

  //   // Escribir archivo
  //   XLSX.writeFile(wb, filename);
  // }

  // handleDownload() {
  //   const filename = `${ReportsExcelNames.CREDITO_DE_SOCIOS}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
  
  //   // Generar workbook
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
  //   // Obtener elementos del estado
  //   const { customerInformationResponse, accountInformation, transactionsHistoryResponse } = this._creditoStateService.state;
  
  //   const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(customerInformationResponse);
  
  //   const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(accountInformation);
  
  //   const ws3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transactionsHistoryResponse);
  
  //   // Combinar las tres hojas en una sola
  //   const combinedData: any[][] = [
  //     ...(<any[][]>XLSX.utils.sheet_to_json(ws1, { header: 1 })),
  //     ...(<any[][]>XLSX.utils.sheet_to_json(ws2, { header: 1 })),
  //     ...(<any[][]>XLSX.utils.sheet_to_json(ws3, { header: 1 }))
  //   ];
  //   const combinedSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(combinedData);
  //   XLSX.utils.book_append_sheet(wb, combinedSheet, 'CombinedSheet');
  
  //   // Escribir archivo
  //   XLSX.writeFile(wb, filename);
  // }

  handleDownload() {
    const filename = `${ReportsExcelNames.CREDITO_DE_SOCIOS}${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    const { customerInformationResponse, accountInformation, transactionsHistoryResponse } = this._creditoStateService.state;
  
    const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(customerInformationResponse);
  
    const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(accountInformation);
  
    const ws3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transactionsHistoryResponse);
  
    const combinedData: any[][] = [
      ...(<any[][]>XLSX.utils.sheet_to_json(ws1, { header: 1 })),
      [], // Fila en blanco
      ...(<any[][]>XLSX.utils.sheet_to_json(ws2, { header: 1 })),
      [], // Fila en blanco
      ...(<any[][]>XLSX.utils.sheet_to_json(ws3, { header: 1 }))
    ];
    const combinedSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(combinedData);
    XLSX.utils.book_append_sheet(wb, combinedSheet, 'CombinedSheet');
  
    // Escribir archivo
    XLSX.writeFile(wb, filename);
  }
  
  
  
  




  handleFavorite() {
    //   this.isLoading = true;
    //   const data: any = {
    //     searchCriteria: {
    //       storeId:
    //         this._creditoStateService.state.inventoryStockResumeDTO.storeId,
    //     },
    //     url: '/inventories/inventory-stock/resume',
    //   };

    //   this._inventoryStockResumeApi.favorite(data).subscribe({
    //     next: async () => {
    //       // await this.setErrorModal(
    //       //   'Completado',
    //       //   'Reporte agregado a favorito',
    //       //   '50px'
    //       // );
    //       this.isLoading = false;
    //       this._toastr.success(
    //         'El reporte se ha agregado a favoritos sastifactoriamente'
    //       );
    //     },
    //     error: (e) => {
    //       console.error('error loading data', e);
    //       this._toastr.error('Opps ha ocurrido un error', e.erros.message);
    //       this.isLoading = false;
    //     },
    //     complete: () => {
    //       this.isLoading = false;
    //     },
    //   });
  }

}
