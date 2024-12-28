import { Component, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../../../services/orders-dashboard-state.service';

@Component({
  selector: 'order-dashboard-before-list',
  standalone: false,
  template: `
    <section class="w-full">
      <p-card header="{{ TEMPLATE_TEXT.title }}">
        <p-table
          #dt1
          [value]="
            _ordersDashboard.state.orderStateInfo.before
              | filterListByField : _ordersDashboard.state.filter
              | filterListByFieldDays : _ordersDashboard.state.filterDays
          "
          dataKey="id"
          [paginator]="false"
          [rows]="15"
          styleClass="mt-3 p-datatable-sm"
          [loading]="_ordersDashboard.state.isLoadingList"
        >
          <ng-template pTemplate="header">
            <tr class="text-sm">
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.store }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.order }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.orderDate }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.orderStatus }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.item }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.description }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.qty }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.itemStatus }}
              </th>
              <th class="text-center  text-white bg-red-500">
                {{ TEMPLATE_TEXT.daysOfWaiting }}
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
                [innerHTML]="highlightSearchText(searchText, report.Tienda)"
              ></td>
              <td
                class="text-center"
                [innerHTML]="highlightSearchText(searchText, report.Order_Id)"
              ></td>
              <td
                class="text-center"
                [innerHTML]="highlightSearchText(searchText, report.Order_Date)"
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.Order_Status)
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="highlightSearchText(searchText, report.item_id)"
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.Description)
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.Order_Quantity)
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.Item_Status)
                "
              ></td>
              <td
                class="text-center"
                [innerHTML]="
                  highlightSearchText(searchText, report.dias_espera)
                "
              ></td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </section>
  `,
  styles: ``,
})
export class OrderDashboardBeforeListComponent {
  _ordersDashboard = inject(OrdersDashboardStateService);

  searchText: any;

  TEMPLATE_TEXT = {
    title: 'Anteriores',
    store: 'Tienda',
    order: 'Orden',
    orderDate: 'Fecha de Orden',
    orderStatus: 'Estatus de Orden',
    item: 'Item',
    description: 'Descripcion',
    qty: 'Cantidad',
    itemStatus: 'Estatus de item',
    daysOfWaiting: 'Días de espera',
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  highlightSearchText(searchText: string, field: any) {
    return field;
  }
}
