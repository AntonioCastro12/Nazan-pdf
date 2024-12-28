import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComparisonComponent } from './inventory-comparison.component';
import { InventoryComparisonReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryComparisonComponent,
    children: [
      {
        path: 'report',
        component: InventoryComparisonReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryComparisonRoutingModule {}
