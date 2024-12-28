import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryPodRoutingModule } from './inventory-pod-routing.module';
import { InventoryPodComponent } from './inventory-pod.component';
import { InventoryPodFormComponent } from './pages/inventory-pod-form/inventory-pod-form.component';
import { InventoryPodListComponent } from './pages/inventory-pod-list/inventory-pod-list.component';
import { InventoryPodOptionsComponent } from './pages/inventory-pod-options/inventory-pod-options.component';
import { InventoryPodReportComponent } from './pages/inventory-pod-report/inventory-pod-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    InventoryPodComponent,
    InventoryPodFormComponent,
    InventoryPodListComponent,
    InventoryPodOptionsComponent,
    InventoryPodReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryPodRoutingModule,
  ],
})
export class InventoryPodModule {}
