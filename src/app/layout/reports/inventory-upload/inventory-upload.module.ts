import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryUploadComponent } from './inventory-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';
import { InventoryUploadRoutingModule } from './inventory-upload-routing.module';
import { InventoryUploadReportComponent } from './pages/inventory-upload-report/inventory-upload-report.component';
import { InventoryUploadFormComponent } from './pages/inventory-upload-form/inventory-upload-form.component';

@NgModule({
  declarations: [InventoryUploadComponent, InventoryUploadReportComponent, InventoryUploadFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventoryUploadRoutingModule,
  ],
})
export class InventoryUploadModule {}
