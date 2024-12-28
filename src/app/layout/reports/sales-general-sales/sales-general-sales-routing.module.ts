import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesGeneralSalesComponent } from './sales-general-sales.component';
import { SalesGeneralSalesReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SalesGeneralSalesComponent,
    children: [
      {
        path: 'report',
        component: SalesGeneralSalesReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesGeneralSalesRoutingModule {}
