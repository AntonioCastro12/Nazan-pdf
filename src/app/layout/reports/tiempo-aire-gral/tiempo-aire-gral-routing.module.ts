import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiempoAireGralComponent } from './tiempo-aire-gral.component'; 
const routes: Routes = [
  {path:'', redirectTo:'report', pathMatch:'full'},
  {path:'report', component:TiempoAireGralComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiempoAireGralRoutingModule { }
