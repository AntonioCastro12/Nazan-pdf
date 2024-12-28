import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersDashboardRoutingModule } from './orders-dashboard-routing.module';
import { OrdersDashboardComponent } from './orders-dashboard.component';
import { OrderDashboardHomeComponent } from './pages/order-dashboard-home/order-dashboard-home.component';
import { OrderDashboardStatusComponent } from './pages/order-dashboard-home/ui/order-dashboard-status/order-dashboard-status.component';
import { OrderDashboardAgeComponent } from './pages/order-dashboard-home/ui/order-dashboard-age/order-dashboard-age.component';
import { OrderDashboardBeforeListComponent } from './pages/order-dashboard-home/ui/order-dashboard-before-list/order-dashboard-before-list.component';
import { OrderDashboardInfoComponent } from './pages/order-dashboard-home/ui/order-dashboard-info/order-dashboard-info.component';
import { OrderDashboardMonthListComponent } from './pages/order-dashboard-home/ui/order-dashboard-month-list/order-dashboard-month-list.component';
import { OrderDashboardWeekListComponent } from './pages/order-dashboard-home/ui/order-dashboard-week-list/order-dashboard-week-list.component';
import { OrderDashboardFilterComponent } from './pages/order-dashboard-home/ui/order-dashboard-filter/order-dashboard-filter.component';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule } from '@angular/forms';
import { OrdersDashboardStoreSelectorComponent } from './pages/order-dashboard-home/ui/orders-dashboard-store-selector/orders-dashboard-store-selector.component';
import { CommonManagerModule } from '../../../shared/common-manager.module';

@NgModule({
  declarations: [
    OrdersDashboardStoreSelectorComponent,
    OrderDashboardAgeComponent,
    OrderDashboardBeforeListComponent,
    OrderDashboardFilterComponent,
    OrderDashboardInfoComponent,
    OrderDashboardMonthListComponent,
    OrderDashboardStatusComponent,
    OrderDashboardWeekListComponent,
    OrderDashboardHomeComponent,
    OrdersDashboardComponent,
  ],
  imports: [
    CommonModule,
    OrdersDashboardRoutingModule,
    PrimeNgModule,
    FormsModule,
    CommonManagerModule,
  ],
})
export class OrdersDashboardModule {}
