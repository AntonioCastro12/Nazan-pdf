import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentAffiliatedKiponRoutingModule } from './segment-affiliated-kipon-routing.module';
import { SegmentAffiliatedKiponComponent } from './segment-affiliated-kipon.component';
import { SegmentAffiliatedKiponFormComponent } from './pages/segment-affiliated-kipon-form/segment-affiliated-kipon-form.component';
import { SegmentAffiliatedKiponListComponent } from './pages/segment-affiliated-kipon-list/segment-affiliated-kipon-list.component';
import { SegmentAffiliatedKiponOptionsComponent } from './pages/segment-affiliated-kipon-options/segment-affiliated-kipon-options.component';
import { SegmentAffiliatedKiponReportComponent } from './pages/segment-affiliated-kipon-report/segment-affiliated-kipon-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor';

@NgModule({
  declarations: [
    SegmentAffiliatedKiponComponent,
    SegmentAffiliatedKiponFormComponent,
    SegmentAffiliatedKiponListComponent,
    SegmentAffiliatedKiponOptionsComponent,
    SegmentAffiliatedKiponReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SegmentAffiliatedKiponRoutingModule,
  ],
})
export class SegmentAffiliatedKiponModule {}
