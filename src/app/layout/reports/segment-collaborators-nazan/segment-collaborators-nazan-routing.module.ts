import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegmentCollaboratorsNazanComponent } from './segment-collaborators-nazan.component';
import { SegmentCollaboratorsNazanReportComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },

  {
    path: '',
    component: SegmentCollaboratorsNazanComponent,
    children: [
      {
        path: 'report',
        component: SegmentCollaboratorsNazanReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentCollaboratorsNazanRoutingModule {}
