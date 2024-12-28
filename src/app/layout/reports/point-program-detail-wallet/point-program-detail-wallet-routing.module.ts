import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointProgramDetailWalletComponent } from './point-program-detail-wallet.component';
import { PointProgramDetailWalletReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: PointProgramDetailWalletComponent,
    children: [
      {
        path: 'report',
        component: PointProgramDetailWalletReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointProgramDetailWalletRoutingModule {}
