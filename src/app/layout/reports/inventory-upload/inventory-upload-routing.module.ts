import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryUploadComponent } from './inventory-upload.component';
import { InventoryUploadReportComponent } from './pages/inventory-upload-report/inventory-upload-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryUploadComponent,
    children: [
      {
        path: 'report',
        component: InventoryUploadReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryUploadRoutingModule {}
