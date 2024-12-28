import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesSearchDeliveredComponent } from './sales-search-delivered.component';
import { SalesSearchDeliveredReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SalesSearchDeliveredComponent,
    children: [
      {
        path: 'report',
        component: SalesSearchDeliveredReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesSearchDeliveredRoutingModule {}
