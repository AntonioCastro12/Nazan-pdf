import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryCycleCountRoutingModule } from './inventory-cycle-count-routing.module';
import { InventoryCycleCountComponent } from './inventory-cycle-count.component';
import { InventoryCycleCountFormComponent } from './pages/inventory-cycle-count-form/inventory-cycle-count-form.component';
import { InventoryCycleCountListComponent } from './pages/inventory-cycle-count-list/inventory-cycle-count-list.component';
import { InventoryCycleCountOptionsComponent } from './pages/inventory-cycle-count-options/inventory-cycle-count-options.component';
import { InventoryCycleCountReportComponent } from './pages/inventory-cycle-count-report/inventory-cycle-count-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    InventoryCycleCountComponent,
    InventoryCycleCountFormComponent,
    InventoryCycleCountListComponent,
    InventoryCycleCountOptionsComponent,
    InventoryCycleCountReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryCycleCountRoutingModule,
  ],
})
export class InventoryCycleCountModule {}
