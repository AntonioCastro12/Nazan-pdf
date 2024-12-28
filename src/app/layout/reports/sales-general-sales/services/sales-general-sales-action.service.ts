import { Injectable } from '@angular/core';
import { SalesGeneralSalesDTO } from '../models';
import { SalesGeneralSalesStateService } from './sales-general-sales-state.service';
import { SalesGeneralSalesApiService } from './sales-general-sales-api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SalesGeneralSalesActionService {
  constructor(
    public _salesGeneralSales: SalesGeneralSalesStateService,
    public _salesGeneralSalesApi: SalesGeneralSalesApiService,
    private _toastr: ToastrService
  ) {}

  onGetList(salesGeneralSalesDTO: SalesGeneralSalesDTO) {
    this._salesGeneralSalesApi.getList(salesGeneralSalesDTO).subscribe({
      next: (data) => {
        this._salesGeneralSales.state.salesGeneralSalesResponse =
          data.sales.data;
        this._salesGeneralSales.state.salesGeneralSalesResponseSalesList =
          data.sales.data;
        this._salesGeneralSales.state.salesGeneralSalesResponsePayFormsList =
          data.paymentMethod.data;
      },
      error: (error) => {
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
        console.error(error);
      },
      complete: () => {
        this._salesGeneralSales.state.isLoadingList = false;
      },
    });
  }
}
