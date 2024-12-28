import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentCollaboratorsNazanRoutingModule } from './segment-collaborators-nazan-routing.module';
import { SegmentCollaboratorsNazanComponent } from './segment-collaborators-nazan.component';
import { SegmentCollaboratorsNazanFormComponent } from './pages/segment-collaborators-nazan-form/segment-collaborators-nazan-form.component';
import { SegmentCollaboratorsNazanListComponent } from './pages/segment-collaborators-nazan-list/segment-collaborators-nazan-list.component';
import { SegmentCollaboratorsNazanOptionsComponent } from './pages/segment-collaborators-nazan-options/segment-collaborators-nazan-options.component';
import { SegmentCollaboratorsNazanReportComponent } from './pages/segment-collaborators-nazan-report/segment-collaborators-nazan-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    SegmentCollaboratorsNazanComponent,
    SegmentCollaboratorsNazanFormComponent,
    SegmentCollaboratorsNazanListComponent,
    SegmentCollaboratorsNazanOptionsComponent,
    SegmentCollaboratorsNazanReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SegmentCollaboratorsNazanRoutingModule,
  ],
})
export class SegmentCollaboratorsNazanModule {}
