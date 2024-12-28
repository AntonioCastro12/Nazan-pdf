import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfExcelComponent } from './pdf-excel.component';

const routes: Routes = [
  { path: '', redirectTo: 'pdf-preciado', pathMatch: 'full' },
  { path: 'pdf-preciado', component: PdfExcelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfExcelRoutingModule { }
