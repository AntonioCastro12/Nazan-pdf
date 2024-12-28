import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointProgramDetailPointsComponent } from './point-program-detail-points.component';
import { PointProgramDetailPointsReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: PointProgramDetailPointsComponent,
    children: [
      {
        path: 'report',
        component: PointProgramDetailPointsReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointProgramDetailPointsRoutingModule {}
