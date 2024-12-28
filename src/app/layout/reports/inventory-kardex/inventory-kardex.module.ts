import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryKardexRoutingModule } from './inventory-kardex-routing.module';
import { InventoryKardexComponent } from './inventory-kardex.component';
import { InventoryKardexListComponent } from './pages/inventory-kardex-list/inventory-kardex-list.component';
import { InventoryKardexFormComponent } from './pages/inventory-kardex-form/inventory-kardex-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';
import { InventoryKardexOptionsComponent } from './pages/inventory-kardex-options/inventory-kardex-options.component';
import { InventoryKardexReportComponent } from './pages/inventory-kardex-report/inventory-kardex-report.component';

@NgModule({
  declarations: [
    InventoryKardexComponent,
    InventoryKardexListComponent,
    InventoryKardexFormComponent,
    InventoryKardexOptionsComponent,
    InventoryKardexReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryKardexRoutingModule,
  ],
})
export class InventoryKardexModule {}
