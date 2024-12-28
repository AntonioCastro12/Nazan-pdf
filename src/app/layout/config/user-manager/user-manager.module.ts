import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UserManagerComponent } from './user-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '@shared/vendor/prime-ng';

import { UserSidepanelSelectorStoreComponent } from './pages/extras/';

@NgModule({
  declarations: [UserManagerComponent, UserSidepanelSelectorStoreComponent],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class UserManagerModule {}
