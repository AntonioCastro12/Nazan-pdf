import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalcIncComponent} from './calc-inc.component'

const routes: Routes = [
  { path: '', redirectTo: 'calc-incremento', pathMatch: 'full' },
  { path: 'calc-incremento', component: CalcIncComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalcIncRoutingModule { }
