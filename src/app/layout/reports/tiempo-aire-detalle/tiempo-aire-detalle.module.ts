import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {TiempoAireDetalleComponent} from '../tiempo-aire-detalle/tiempo-aire-detalle.component';

import { TiempoAireDetalleRoutingModule } from './tiempo-aire-detalle-routing.module';
import {TaDetFormComponent} from './pages/ta-det-form/ta-det-form.component';
import {TaDetListComponent} from './pages/ta-det-list/ta-det-list.component';
import {TaDetOptionsComponent} from './pages/ta-det-options/ta-det-options.component';


@NgModule({
  declarations: [
    TiempoAireDetalleComponent,
    TaDetFormComponent,
    TaDetListComponent,
    TaDetOptionsComponent

  ],
  imports: [
    CommonModule,
    TiempoAireDetalleRoutingModule,
    PrimeNgModule,
    FormsModule, 
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class TiempoAireDetalleModule { }
