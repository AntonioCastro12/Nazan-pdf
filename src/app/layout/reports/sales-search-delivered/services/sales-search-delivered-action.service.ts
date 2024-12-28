import { Injectable } from '@angular/core';
import { SalesSearchDeliveredDTO } from '../models';
import { SalesSearchDeliveredStateService } from './sales-search-delivered-state.service';
import { SalesSearchDeliveredApiService } from './sales-search-delivered-api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SalesSearchDeliveredActionService {
  constructor(
    public _SalesSearchDelivered: SalesSearchDeliveredStateService,
    public _SalesSearchDeliveredApi: SalesSearchDeliveredApiService,
    private _toastr: ToastrService
  ) {}

  onGetList(SalesSearchDeliveredDTO: SalesSearchDeliveredDTO) {
    this._SalesSearchDeliveredApi.getList(SalesSearchDeliveredDTO).subscribe({
      next: (data) => {
        this._SalesSearchDelivered.state.SalesSearchDeliveredResponse = data;
        const onTheWay = data.filter((item: any) => item.entregado === false);
        const received = data.filter((item: any) => item.entregado === true);
        this._SalesSearchDelivered.state.SalesSearchDeliveredResponseOnTheWay =
          onTheWay;
        this._SalesSearchDelivered.state.SalesSearchDeliveredResponseReceived =
          received;
      },
      error: (error) => {
        console.error(error);
        this._toastr.error('Opps ha ocurrido un error', error.erros?.message);
      },
      complete: () => {
        this._SalesSearchDelivered.state.isLoadingList = false;
      },
    });
  }
}
