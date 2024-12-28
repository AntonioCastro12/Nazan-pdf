import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagerComponent } from './report-manager.component';
import { ReportInventoryKardexComponent } from './pages/report-inventory-cardex/report-inventory-kardex.component';
import { ReportInventoryStockResumeComponent } from './pages/report-inventory-stock-resume/report-inventory-stock-resume.component';
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
import { ReportSalesSearchDelivered } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'inventories', pathMatch: 'full' },
  {
    path: '',
    component: ReportManagerComponent,
    children: [
      {
        path: 'inventories',
        redirectTo: 'inventories/kardex',
        pathMatch: 'full',
      },
      { path: 'inventories/kardex', component: ReportInventoryKardexComponent },
      {
        path: 'inventories/inventory-stock/resume',
        component: ReportInventoryStockResumeComponent,
      },
      {
        path: 'inventories/comparison',
        component: ReportInventoryComparisonComponent,
      },
      { path: 'inventories/pod', component: ReportInventoryPodComponent },
      {
        path: 'inventories/sap-xstore',
        component: ReportInventorySapXtoreComponent,
      },
      {
        path: 'inventories/cycle-count',
        component: ReportInventoryCycleCountComponent,
      },
      {
        path: 'point-program/total-movement',
        component: ReportPointProgramTotalMovementComponent,
      },
      {
        path: 'point-program/detail-points',
        component: ReportPointProgramDetailPointsComponent,
      },
      {
        path: 'point-program/detail-wallet',
        component: ReportPointProgramDetailWalletComponent,
      },
      { path: 'sales/invoice-total', component: ReportSalesInvoiceTotal },
      { path: 'sales/general-sales', component: ReportSalesGeneralSales },
      {
        path: 'sales/wholesale-sales',
        component: ReportSalesWholesaleComponent,
      },
      { path: 'sales/search-delivered', component: ReportSalesSearchDelivered },
      {
        path: 'segments/affiliated-kipon',
        component: ReportSegmentAffiliatedKipon,
      },
      {
        path: 'segments/collaborators-nazan',
        component: ReportSegmentCollaboratorsNazan,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportManagerRoutingModule {}
