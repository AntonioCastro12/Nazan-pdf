import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-status',
  standalone: false,
  template: `
    <section class="w-full">
      <p-card header="{{ TEMPLATE_TEXT.title }}">
        <p-table
          #dt2
          [value]="_ordersDashboard.state.orderStateInfo.totalsByStatus"
          [paginator]="false"
          [rows]="15"
          styleClass="mt-3 p-datatable-sm"
          [loading]="_ordersDashboard.state.isLoadingList"
        >
          <ng-template pTemplate="header">
            <tr class="text-sm">
              <th class="text-center">
                {{ TEMPLATE_TEXT.store }}
              </th>
              <th class="text-center">
                {{ TEMPLATE_TEXT.status }}
              </th>
              <th class="text-center">
                {{ TEMPLATE_TEXT.qty }}
              </th>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage" let-columns>
            <tr>
              <td [attr.colspan]="9" class="text-center">
                {{
                  _ordersDashboard.state.isLoadingList
                    ? TEMPLATE_TEXT.isLoadingOn
                    : TEMPLATE_TEXT.isResultEmpty
                }}
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-report>
            <tr class="text-sm">
              <td
                class="text-center bg-yellow-300"
                [innerHTML]="
                  highlightSearchText(
                    searchText,
                    _ordersDashboard.state.storeSelected.id
                  )
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.order_status)
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="highlightSearchText(searchText, report.qty)"
              ></td>
            </tr>
          </ng-template>
          <ng-template pTemplate="footer">
            <tr>
              <td></td>
              <td class="text-center w-full text-2xl font-bold">Total:</td>
              <td class="text-center text-2xl font-bold">
                {{
                  this._ordersDashboard.state.orderStateInfo.totalsByStatusFinal
                }}
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </section>
  `,
  styles: ``,
})
export class OrderDashboardStatusComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);

  searchText: any;

  TEMPLATE_TEXT = {
    title: 'Por ESTATUS de Orden',
    store: 'Tienda',
    status: 'Estatus de Orden',
    qty: 'Total',
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
