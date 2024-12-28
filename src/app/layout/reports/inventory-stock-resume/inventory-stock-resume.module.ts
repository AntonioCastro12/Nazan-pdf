import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryStockResumeRoutingModule } from './inventory-stock-resume-routing.module';
import { InventoryStockResumeComponent } from './inventory-stock-resume.component';
import { InventoryStockResumeFormComponent } from './pages/inventory-stock-resume-form/inventory-stock-resume-form.component';
import { InventoryStockResumeListComponent } from './pages/inventory-stock-resume-list/inventory-stock-resume-list.component';
import { InventoryStockResumeOptionsComponent } from './pages/inventory-stock-resume-options/inventory-stock-resume-options.component';
import { InventoryStockResumeReportComponent } from './pages/inventory-stock-resume-report/inventory-stock-resume-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';
import { InventoryStockDetailListComponent } from './pages/inventory-stock-detail-list/inventory-stock-detail-list.component';

@NgModule({
  declarations: [
    InventoryStockResumeComponent,
    InventoryStockResumeFormComponent,
    InventoryStockResumeListComponent,
    InventoryStockResumeOptionsComponent,
    InventoryStockResumeReportComponent,
    InventoryStockDetailListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryStockResumeRoutingModule,
  ],
})
export class InventoryStockResumeModule {}
