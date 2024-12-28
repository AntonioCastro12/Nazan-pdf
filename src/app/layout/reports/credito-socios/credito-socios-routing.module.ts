import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditoSociosComponent } from './credito-socios.component'; 

const routes: Routes = [
  {path:'', redirectTo: 'credito-socios', pathMatch:'full'},
  {path:'credito-socios', component: CreditoSociosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditoSociosRoutingModule { }
