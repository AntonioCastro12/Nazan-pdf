import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesWholesaleRoutingModule } from './sales-wholesale-routing.module';
import { SalesWholesaleComponent } from './sales-wholesale.component';
import { SalesWholesaleFormComponent } from './pages/sales-wholesale-form/sales-wholesale-form.component';
import { SalesWholesaleListComponent } from './pages/sales-wholesale-list/sales-wholesale-list.component';
import { SalesWholesaleOptionsComponent } from './pages/sales-wholesale-options/sales-wholesale-options.component';
import { SalesWholesaleReportComponent } from './pages/sales-wholesale-report/sales-wholesale-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    SalesWholesaleComponent,
    SalesWholesaleFormComponent,
    SalesWholesaleListComponent,
    SalesWholesaleOptionsComponent,
    SalesWholesaleReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SalesWholesaleRoutingModule,
  ],
})
export class SalesWholesaleModule {}
