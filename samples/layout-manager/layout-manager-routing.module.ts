import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutFrameComponent } from './pages/layout-frame/layout-frame.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutFrameComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import(
            'src/app/layout/modules/home-manager/home-manager.module'
          ).then((m) => m.HomeManagerModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('samples/report-manager/report-manager.module').then(
            (m) => m.ReportManagerModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class LayoutManagerRoutingModule {}
