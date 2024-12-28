import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointProgramDetailPointsRoutingModule } from './point-program-detail-points-routing.module';
import { PointProgramDetailPointsComponent } from './point-program-detail-points.component';
import { PointProgramDetailPointsFormComponent } from './pages/point-program-detail-points-form/point-program-detail-points-form.component';
import { PointProgramDetailPointsListComponent } from './pages/point-program-detail-points-list/point-program-detail-points-list.component';
import { PointProgramDetailPointsOptionsComponent } from './pages/point-program-detail-points-options/point-program-detail-points-options.component';
import { PointProgramDetailPointsReportComponent } from './pages/point-program-detail-points-report/point-program-detail-points-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    PointProgramDetailPointsComponent,
    PointProgramDetailPointsFormComponent,
    PointProgramDetailPointsListComponent,
    PointProgramDetailPointsOptionsComponent,
    PointProgramDetailPointsReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    PointProgramDetailPointsRoutingModule,
  ],
})
export class PointProgramDetailPointsModule {}
