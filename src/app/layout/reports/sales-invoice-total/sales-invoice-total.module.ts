import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesInvoiceTotalRoutingModule } from './sales-invoice-total-routing.module';
import { SalesInvoiceTotalComponent } from './sales-invoice-total.component';
import { SalesInvoiceTotalFormComponent } from './pages/sales-invoice-total-form/sales-invoice-total-form.component';
import { SalesInvoiceTotalListComponent } from './pages/sales-invoice-total-list/sales-invoice-total-list.component';
import { SalesInvoiceTotalOptionsComponent } from './pages/sales-invoice-total-options/sales-invoice-total-options.component';
import { SalesInvoiceTotalReportComponent } from './pages/sales-invoice-total-report/sales-invoice-total-report.component';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SalesInvoiceTotalComponent,
    SalesInvoiceTotalFormComponent,
    SalesInvoiceTotalListComponent,
    SalesInvoiceTotalOptionsComponent,
    SalesInvoiceTotalReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SalesInvoiceTotalRoutingModule,
  ],
})
export class SalesInvoiceTotalModule {}
