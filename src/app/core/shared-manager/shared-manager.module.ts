import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedManagerRoutingModule } from './shared-manager-routing.module';
import { SharedManagerComponent } from './shared-manager.component';


@NgModule({
  declarations: [
    SharedManagerComponent
  ],
  imports: [
    CommonModule,
    SharedManagerRoutingModule
  ]
})
export class SharedManagerModule { }
