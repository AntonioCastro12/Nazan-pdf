import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalcIncRoutingModule } from '../../calc-inc/calc-inc-routing.module';
import { CalcIncComponent } from '../../calc-inc/calc-inc.component';
import { CalcIncFormsComponent } from '../../calc-inc/pages/calc-inc-forms/calc-inc-forms.component';
import { CalcIncListComponent } from '../../calc-inc/pages/calc-inc-list/calc-inc-list.component';
import { CalcIncOptionsComponent } from '../../calc-inc/pages/calc-inc-options/calc-inc-options.component';
import { PdfExcelRoutingModule } from './pdf-excel.routing.module';
import { PdfExcelComponent } from './pdf-excel.component';

// import { CalcIncComponent } from './calc-inc.component';
// import { CalcIncFormsComponent } from './pages/calc-inc-forms/calc-inc-forms.component';
// import { CalcIncOptionsComponent } from './pages/calc-inc-options/calc-inc-options.component';
// import { CalcIncListComponent } from './pages/calc-inc-list/calc-inc-list.component';
// import { CalcIncRoutingModule } from './calc-inc-routing.module';
// import { PdfExcelRoutingModule } from '../pdf-generete/pdf-excel/pdf-excel.routing.module';


@NgModule({
  declarations: [PdfExcelComponent],
  imports: [
    CommonModule,
    PdfExcelRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    PdfExcelRoutingModule
  ]
})
export class PdfAppModule { }

