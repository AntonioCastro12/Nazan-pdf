import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagerComponent } from './user-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },

  {
    path: '',
    component: UserManagerComponent,
    children: [
      // {
      //   path: 'list',
      //   component: UserListComponent,
      //   data: { animationState: 'One' },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerRoutingModule {}
