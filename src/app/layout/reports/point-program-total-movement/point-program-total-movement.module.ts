import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramTotalMovementRoutingModule } from './point-program-total-movement-routing.module';
import { PointProgramTotalMovementComponent } from './point-program-total-movement.component';
import { PointProgramTotalMovementFormComponent } from './pages/point-program-total-movement-form/point-program-total-movement-form.component';
import { PointProgramTotalMovementListComponent } from './pages/point-program-total-movement-list/point-program-total-movement-list.component';
import { PointProgramTotalMovementOptionsComponent } from './pages/point-program-total-movement-options/point-program-total-movement-options.component';
import { PointProgramTotalMovementReportComponent } from './pages/point-program-total-movement-report/point-program-total-movement-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    PointProgramTotalMovementComponent,
    PointProgramTotalMovementFormComponent,
    PointProgramTotalMovementListComponent,
    PointProgramTotalMovementOptionsComponent,
    PointProgramTotalMovementReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    PointProgramTotalMovementRoutingModule,
  ],
})
export class PointProgramTotalMovementModule {}
