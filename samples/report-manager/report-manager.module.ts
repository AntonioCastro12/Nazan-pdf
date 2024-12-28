import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { LuxonModule } from 'luxon-angular';
import { ReportManagerRoutingModule } from './report-manager-routing.module';
import { ReportManagerComponent } from './report-manager.component';
import { OptionsComponent } from 'src/app/shared/components/options/options.component';
import { ReportInventoryComparisonComponent } from './pages/report-inventory-comparison/report-inventory-comparison.component';
import { ReportInventoryPodComponent } from './pages/report-inventory-pod/report-inventory-pod.component';
import { ReportPointProgramDetailPointsComponent } from './pages/report-point-program-detail-points/report-point-program-detail-points.component';
import { ReportPointProgramDetailWalletComponent } from './pages/report-point-program-detail-wallet/report-point-program-detail-wallet.component';
import { ReportSalesInvoiceTotal } from './pages/report-sales-invoice-total/report-sales-invoice-total.component';
import { ReportInventorySapXtoreComponent } from './pages/report-inventory-sap-xstore/report-inventory-sap-xstore.component';
import { ReportPointProgramTotalMovementComponent } from './pages/report-point-program-total-movement/report-point-program-total-movement.component';
import { ReportSalesGeneralSales } from './pages/report-sales-general-sales/report-sales-general-sales.component';
import { ReportSegmentAffiliatedKipon } from './pages/report-segment-affiliated-kipon/report-segment-affiliated-kipon.component';
import { ReportSegmentCollaboratorsNazan } from './pages/report-segment-collaborators-nazan/report-segment-collaborators-nazan.component';
import { ReportInventoryCycleCountComponent } from './pages/report-inventory-cycle-count/report-inventory-cycle-count.component';
import { ReportSalesWholesaleComponent } from './pages/report-sales-wholesale/report-sales-wholesale.component';
import { ReportInventoryKardexComponent } from './pages/report-inventory-cardex/report-inventory-kardex.component';
import { ReportInventoryStockResumeComponent } from './pages/report-inventory-stock-resume/report-inventory-stock-resume.component';
import { ReportSalesSearchDelivered } from './pages/report-sales-search-delivered/report-sales-search-delivered.component';

@NgModule({
  declarations: [
    ReportManagerComponent,
    OptionsComponent,
    ReportInventoryKardexComponent,
    ReportInventoryStockResumeComponent,
    ReportInventoryComparisonComponent,
    ReportInventoryPodComponent,
    ReportPointProgramDetailPointsComponent,
    ReportPointProgramDetailWalletComponent,
    ReportSalesInvoiceTotal,
    ReportInventorySapXtoreComponent,
    ReportPointProgramTotalMovementComponent,
    ReportSalesGeneralSales,
    ReportSegmentAffiliatedKipon,
    ReportSegmentCollaboratorsNazan,
    ReportInventoryCycleCountComponent,
    ReportSalesWholesaleComponent,
    ReportSalesSearchDelivered,
  ],
  imports: [
    LuxonModule,
    CommonModule,
    ReportManagerRoutingModule,
    PrimeNgModule,
    ChartModule,
  ],
})
export class ReportManagerModule {}
