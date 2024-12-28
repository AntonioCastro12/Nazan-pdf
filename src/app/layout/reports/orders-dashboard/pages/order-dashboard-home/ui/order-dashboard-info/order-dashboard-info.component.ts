import { Component } from '@angular/core';

@Component({
  selector: 'order-dashboard-info',
  standalone: false,
  template: ` <h2>{{ TEMPLATE_TEXT.title }}</h2> `,
  styles: ``,
})
export class OrderDashboardInfoComponent {
  TEMPLATE_TEXT = {
    title: 'Dashboard de órdenes',
  };
}
