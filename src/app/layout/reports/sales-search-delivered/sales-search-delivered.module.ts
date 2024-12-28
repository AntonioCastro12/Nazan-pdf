import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesSearchDeliveredRoutingModule } from './sales-search-delivered-routing.module';
import { SalesSearchDeliveredReportComponent } from './pages/sales-search-delivered-report/sales-search-delivered-report.component';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesSearchDeliveredComponent } from './sales-search-delivered.component';
import { SalesSearchDeliveredFormComponent } from './pages/sales-search-delivered-form/sales-search-delivered-form.component';
import { SalesSearchDeliveredListComponent } from './pages/sales-search-delivered-list/sales-search-delivered-list.component';
import { SalesSearchDeliveredOptionsComponent } from './pages';

@NgModule({
  declarations: [
    SalesSearchDeliveredComponent,
    SalesSearchDeliveredFormComponent,
    SalesSearchDeliveredListComponent,
    SalesSearchDeliveredOptionsComponent,
    SalesSearchDeliveredReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SalesSearchDeliveredRoutingModule,
  ],
})
export class SalesSearchDeliveredModule {}
