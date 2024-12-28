import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegmentAffiliatedKiponComponent } from './segment-affiliated-kipon.component';
import { SegmentAffiliatedKiponReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SegmentAffiliatedKiponComponent,
    children: [
      {
        path: 'report',
        component: SegmentAffiliatedKiponReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentAffiliatedKiponRoutingModule {}
