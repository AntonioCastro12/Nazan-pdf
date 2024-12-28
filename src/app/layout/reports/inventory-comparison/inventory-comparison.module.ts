import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryComparisonRoutingModule } from './inventory-comparison-routing.module';
import { InventoryComparisonComponent } from './inventory-comparison.component';
import { InventoryComparisonFormComponent } from './pages/inventory-comparison-form/inventory-comparison-form.component';
import { InventoryComparisonListComponent } from './pages/inventory-comparison-list/inventory-comparison-list.component';
import { InventoryComparisonOptionsComponent } from './pages/inventory-comparison-options/inventory-comparison-options.component';
import { InventoryComparisonReportComponent } from './pages/inventory-comparison-report/inventory-comparison-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    InventoryComparisonComponent,
    InventoryComparisonFormComponent,
    InventoryComparisonListComponent,
    InventoryComparisonOptionsComponent,
    InventoryComparisonReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryComparisonRoutingModule,
  ],
})
export class InventoryComparisonModule {}
