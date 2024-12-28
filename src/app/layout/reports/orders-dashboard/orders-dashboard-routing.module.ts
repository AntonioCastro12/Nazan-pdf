import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersDashboardComponent } from './orders-dashboard.component';
import { OrderDashboardHomeComponent } from './pages/order-dashboard-home/order-dashboard-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: OrdersDashboardComponent,
    children: [
      {
        path: 'home',
        component: OrderDashboardHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersDashboardRoutingModule {}
