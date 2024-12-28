import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';
import { OrdersDashboardActionService } from '../../../../services/orders-dashboard.action.service';
import { OrdersDashboardResponse } from '../../../../models/orders-dashboard.response';

@Component({
  selector: 'orders-dashboard-store-selector',
  standalone: false,
  template: `
    <p-dropdown
      inputId="storeId"
      [options]="_ordersDashboard.state.storeList"
      [filter]="true"
      [(ngModel)]="_ordersDashboard.state.storeSelected"
      optionLabel="name"
      placeholder="{{ TEMPLATE_TXT.selectStore }}"
      styleClass="w-full"
      (onChange)="searchInfo()"
    ></p-dropdown>
  `,
  styles: ``,
})
export class OrdersDashboardStoreSelectorComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);
  _ordersDashboardAction = inject(OrdersDashboardActionService);

  TEMPLATE_TXT = {
    selectStore: 'Tienda seleccionada',
  };

  searchInfo() {
    this._ordersDashboard.state.orderStateInfo = new OrdersDashboardResponse();
    this._ordersDashboardAction.onOrdersDashboardInfo(
      this._ordersDashboard.state.storeSelected.id
    );
  }
}
