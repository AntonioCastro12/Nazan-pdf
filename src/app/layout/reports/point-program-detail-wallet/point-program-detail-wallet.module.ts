import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramDetailWalletRoutingModule } from './point-program-detail-wallet-routing.module';
import { PointProgramDetailWalletComponent } from './point-program-detail-wallet.component';
import { PointProgramDetailWalletFormComponent } from './pages/point-program-detail-wallet-form/point-program-detail-wallet-form.component';
import { PointProgramDetailWalletListComponent } from './pages/point-program-detail-wallet-list/point-program-detail-wallet-list.component';
import { PointProgramDetailWalletOptionsComponent } from './pages/point-program-detail-wallet-options/point-program-detail-wallet-options.component';
import { PointProgramDetailWalletReportComponent } from './pages/point-program-detail-wallet-report/point-program-detail-wallet-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    PointProgramDetailWalletComponent,
    PointProgramDetailWalletFormComponent,
    PointProgramDetailWalletListComponent,
    PointProgramDetailWalletOptionsComponent,
    PointProgramDetailWalletReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    PointProgramDetailWalletRoutingModule,
  ],
})
export class PointProgramDetailWalletModule {}
