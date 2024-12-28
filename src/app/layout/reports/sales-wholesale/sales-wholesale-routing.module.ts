import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesWholesaleComponent } from './sales-wholesale.component';
import { SalesWholesaleReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SalesWholesaleComponent,
    children: [
      {
        path: 'report',
        component: SalesWholesaleReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesWholesaleRoutingModule {}
