import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryStockResumeComponent } from './inventory-stock-resume.component';
import { InventoryStockResumeReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryStockResumeComponent,
    children: [
      {
        path: 'report',
        component: InventoryStockResumeReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryStockResumeRoutingModule {}
