import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { TiempoAireGralRoutingModule } from './tiempo-aire-gral-routing.module';
import { TiempoAireGralComponent } from './tiempo-aire-gral.component';
import {TaGralOptionsComponent} from './pages/ta-gral-options/ta-gral-options.component'
import {TaGralFormComponent} from './pages/ta-gral-form/ta-gral-form.component';
import {TaGralListComponent} from './pages/ta-gral-list/ta-gral-list.component';

@NgModule({
  declarations: [
    TiempoAireGralComponent,
    TaGralOptionsComponent,
    TaGralFormComponent,
    TaGralListComponent

  ],
  imports: [
    CommonModule,
    TiempoAireGralRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class TiempoAireGralModule { }
