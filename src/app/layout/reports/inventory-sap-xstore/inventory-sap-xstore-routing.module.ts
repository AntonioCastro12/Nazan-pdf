import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventorySapXstoreComponent } from './inventory-sap-xstore.component';
import { InventorySapXstoreReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventorySapXstoreComponent,
    children: [
      {
        path: 'report',
        component: InventorySapXstoreReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventorySapXstoreRoutingModule {}
