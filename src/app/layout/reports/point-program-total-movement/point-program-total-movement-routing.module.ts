import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointProgramTotalMovementComponent } from './point-program-total-movement.component';
import { PointProgramTotalMovementReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: PointProgramTotalMovementComponent,
    children: [
      {
        path: 'report',
        component: PointProgramTotalMovementReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointProgramTotalMovementRoutingModule {}
