import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesInvoiceTotalComponent } from './sales-invoice-total.component';
import { SalesInvoiceTotalReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SalesInvoiceTotalComponent,
    children: [
      {
        path: 'report',
        component: SalesInvoiceTotalReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesInvoiceTotalRoutingModule {}
