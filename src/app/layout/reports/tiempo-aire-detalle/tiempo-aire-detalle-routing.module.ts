import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TiempoAireDetalleComponent} from '../tiempo-aire-detalle/tiempo-aire-detalle.component';

const routes: Routes = [
  {path:'', redirectTo:'report', pathMatch:'full'},
  {path:'report', component:TiempoAireDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiempoAireDetalleRoutingModule { }
