import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryKardexComponent } from './inventory-kardex.component';
import { InventoryKardexReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryKardexComponent,
    children: [
      {
        path: 'report',
        component: InventoryKardexReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryKardexRoutingModule {}
