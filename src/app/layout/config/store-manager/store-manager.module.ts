import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { StoreManagerComponent } from './store-manager.component';


@NgModule({
  declarations: [
    StoreManagerComponent
  ],
  imports: [
    CommonModule,
    StoreManagerRoutingModule
  ]
})
export class StoreManagerModule { }
