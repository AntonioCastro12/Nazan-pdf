import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryPodComponent } from './inventory-pod.component';
import { InventoryPodReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: InventoryPodComponent,
    children: [
      {
        path: 'report',
        component: InventoryPodReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryPodRoutingModule {}
