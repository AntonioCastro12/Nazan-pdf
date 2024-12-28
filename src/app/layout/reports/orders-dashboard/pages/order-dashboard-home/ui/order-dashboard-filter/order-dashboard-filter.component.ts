import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-filter',
  standalone: false,
  template: `
    <section>
      <p-card header="Buscadores">
        <input
          placeholder="Buscador"
          type="text"
          pInputText
          [(ngModel)]="_ordersDashboard.state.filter"
          (focus)="resetOtherFilter('all')"
        />
        <input
          placeholder="Buscador de días de espera"
          type="text"
          pInputText
          [(ngModel)]="_ordersDashboard.state.filterDays"
          (focus)="resetOtherFilter('days')"
        />
      </p-card>
    </section>
  `,
  styles: ``,
})
export class OrderDashboardFilterComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);
  resetOtherFilter(filter: string) {
    if (filter === 'all') {
      this._ordersDashboard.state.filterDays = '';
    }
    if (filter === 'days') {
      this._ordersDashboard.state.filter = '';
    }
  }
}
