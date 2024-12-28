import { Injectable, inject } from '@angular/core';
import { OrdersDashboardApiService } from './orders-dashboard.api.service';
import { OrdersDashboardStateService } from './orders-dashboard-state.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrdersDashboardActionService {
  _ordersDashboardApi = inject(OrdersDashboardApiService);
  _ordersDashboard = inject(OrdersDashboardStateService);

  _toastr = inject(ToastrService);

  onOrdersDashboardInfo(store: string) {
    this._ordersDashboard.state.isLoaddingInfo = true;
    this._ordersDashboard.state.isVisibleInfo = false;
    this._ordersDashboardApi.ordersDashboardInfo(store).subscribe({
      next: (response) => {
        this._ordersDashboard.state.orderStateInfo = response;
        this._ordersDashboard.state.orderStateInfo.totalsByStatusFinal = 0;
        const sumatoria = response.totalsByStatus.map((x) => {
          this._ordersDashboard.state.orderStateInfo.totalsByStatusFinal +=
            x.qty;
        });
        this._ordersDashboard.state.isVisibleInfo = true;
        this._ordersDashboard.state.isLoaddingInfo = false;
      },
      error: (error) => {
        const showError = error.error.name.includes('tbNAZ_OrderDetail')
          ? 'Esta tienda no está configurada para este reporte'
          : error.error.errors[0].message;

        this._toastr.error(showError, 'Ups... ha ocurrido un error');
        console.error(error);
        this._ordersDashboard.state.isLoaddingInfo = false;
      },
      complete: () => {
        this._ordersDashboard.state.isLoadingList = false;
        this._ordersDashboard.state.isLoaddingInfo = false;
      },
    });
  }
}
