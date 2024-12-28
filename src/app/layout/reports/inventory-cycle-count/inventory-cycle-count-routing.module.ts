import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryCycleCountComponent } from './inventory-cycle-count.component';
import { InventoryCycleCountReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryCycleCountComponent,
    children: [
      {
        path: 'report',
        component: InventoryCycleCountReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryCycleCountRoutingModule {}
