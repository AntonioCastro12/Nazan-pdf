import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PlantillasComponent } from './Plantillas.component'; // Importar correctamente el componente

const routes: Routes = [
  { path: '', redirectTo: 'app-plantillas-pdf', pathMatch: 'full' }, // Redirección corregida
  // { path: 'app-plantillas-pdf', component: PlantillasComponent }, // Usar el componente, no el módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillasRoutingModule {} // Nombre correcto del módulo
