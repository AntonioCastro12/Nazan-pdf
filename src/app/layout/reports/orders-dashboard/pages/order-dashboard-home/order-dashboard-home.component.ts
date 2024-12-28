import { filter } from 'rxjs';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OrdersDashboardStateService } from '../../services/orders-dashboard-state.service';
import { OrdersDashboardActionService } from '../../services/orders-dashboard.action.service';

@Component({
  selector: 'order-dashboard-home',
  standalone: false,
  template: `
    <ng-container>
      <article class="card">
        <order-dashboard-info></order-dashboard-info>
        <orders-dashboard-store-selector />
      </article>
      <section
        class="card flex flex-row gap-3"
        *ngIf="_ordersDashboard.state.isVisibleInfo"
      >
        <article class="basis-1/2">
          <order-dashboard-status />
        </article>
        <article class="basis-1/2">
          <order-dashboard-age />
        </article>
      </section>

      <section class="card" *ngIf="_ordersDashboard.state.isVisibleInfo">
        <order-dashboard-filter />
      </section>

      <section class="card" *ngIf="_ordersDashboard.state.isVisibleInfo">
        <order-dashboard-before-list />
        <order-dashboard-month-list />
        <order-dashboard-week-list />
      </section>
      <section
        class="card text-center"
        *ngIf="!_ordersDashboard.state.isVisibleInfo"
      >
        <p>Seleccione una tienda</p>
      </section>
      <section
        class="text-center"
        *ngIf="_ordersDashboard.state.isLoaddingInfo"
      >
        <p-progressSpinner ariaLabel="loading"></p-progressSpinner>
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class OrderDashboardHomeComponent implements OnInit, OnDestroy {
  _ordersDashboard = inject(OrdersDashboardStateService);
  _ordersDashboardAction = inject(OrdersDashboardActionService);

  ngOnInit(): void {
    this._ordersDashboard.state.storeSelected = JSON.parse(
      sessionStorage.getItem('storeSelected') as string
    );

    this._ordersDashboard.state.storeList = JSON.parse(
      sessionStorage.getItem('storeList') as string
    ).filter((x: any) => x.type == 'W');
  }

  ngOnDestroy(): void {
    this._ordersDashboard.state.isVisibleInfo = false;
  }
}
