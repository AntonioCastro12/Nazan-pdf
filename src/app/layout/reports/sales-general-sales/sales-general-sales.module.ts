import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesGeneralSalesRoutingModule } from './sales-general-sales-routing.module';
import { SalesGeneralSalesComponent } from './sales-general-sales.component';
import { SalesGeneralSalesFormComponent } from './pages/sales-general-sales-form/sales-general-sales-form.component';
import { SalesGeneralSalesListComponent } from './pages/sales-general-sales-list/sales-general-sales-list.component';
import { SalesGeneralSalesOptionsComponent } from './pages/sales-general-sales-options/sales-general-sales-options.component';
import { SalesGeneralSalesReportComponent } from './pages/sales-general-sales-report/sales-general-sales-report.component';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SalesGeneralSalesComponent,
    SalesGeneralSalesFormComponent,
    SalesGeneralSalesListComponent,
    SalesGeneralSalesOptionsComponent,
    SalesGeneralSalesReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SalesGeneralSalesRoutingModule,
  ],
})
export class SalesGeneralSalesModule {}
