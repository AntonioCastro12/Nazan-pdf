import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '@shared/vendor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
// import { PlantillasComponent } from './Plantillas.component';
import { PlantillasRoutingModule } from './Plantillas.routing.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    PlantillasRoutingModule,
    NgxExtendedPdfViewerModule // Correcto módulo de rutas
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlantillaModule {}
