import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-age',
  standalone: false,
  template: `
    <section class="w-full">
      <p-card header="{{ TEMPLATE_TEXT.title }}">
        <p-table
          #dt2
          [value]="[_ordersDashboard.state.orderStateInfo.totalsByRange]"
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
                {{ TEMPLATE_TEXT.lastWeek }}
              </th>
              <th class="text-center">
                {{ TEMPLATE_TEXT.aMonth }}
              </th>
              <th class="text-center">
                {{ TEMPLATE_TEXT.previous }}
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
            <tr>
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
                class="text-center bg-green-300 text-2xl font-bold"
                [innerHTML]="highlightSearchText(searchText, report.week)"
              ></td>
              <td
                class="text-center bg-orange-300 text-2xl font-bold"
                [innerHTML]="highlightSearchText(searchText, report.month)"
              ></td>
              <td
                class="text-center bg-red-300 text-2xl font-bold text-white"
                [innerHTML]="highlightSearchText(searchText, report.before)"
              ></td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </section>
  `,
  styles: ``,
})
export class OrderDashboardAgeComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);

  searchText: any;

  TEMPLATE_TEXT = {
    title: 'Por ANTIGÜEDAD de Orden',
    store: 'Tienda',
    lastWeek: 'Última semana',
    aMonth: 'Un mes',
    previous: 'Anteriores',
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
