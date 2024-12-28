import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventorySapXstoreRoutingModule } from './inventory-sap-xstore-routing.module';
import { InventorySapXstoreComponent } from './inventory-sap-xstore.component';
import { InventorySapXstoreFormComponent } from './pages/inventory-sap-xstore-form/inventory-sap-xstore-form.component';
import { InventorySapXstoreListComponent } from './pages/inventory-sap-xstore-list/inventory-sap-xstore-list.component';
import { InventorySapXstoreOptionsComponent } from './pages/inventory-sap-xstore-options/inventory-sap-xstore-options.component';
import { InventorySapXstoreReportComponent } from './pages/inventory-sap-xstore-report/inventory-sap-xstore-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    InventorySapXstoreComponent,
    InventorySapXstoreFormComponent,
    InventorySapXstoreListComponent,
    InventorySapXstoreOptionsComponent,
    InventorySapXstoreReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    InventorySapXstoreRoutingModule,
  ],
})
export class InventorySapXstoreModule {}
