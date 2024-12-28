import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditoSociosRoutingModule } from './credito-socios-routing.module';
import { CreditoSociosComponent } from './credito-socios.component';
import { CreditOptionsComponent } from './pages/credit-options/credit-options.component';
import { CreditFormComponent } from './pages/credit-form/credit-form.component';
import { CreditListComponent } from './pages/credit-list/credit-list.component';
import { CreditDetailListComponent } from './pages/credit-detail-list/credit-detail-list.component';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    CreditoSociosComponent,
    CreditOptionsComponent,
    CreditFormComponent,
    CreditListComponent,
    CreditDetailListComponent
  ],
  imports: [
    CommonModule,
    CreditoSociosRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule
  ]
})
export class CreditoSociosModule { }
