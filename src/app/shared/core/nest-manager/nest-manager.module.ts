import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NestManagerRoutingModule } from './nest-manager-routing.module';
import { NestManagerComponent } from './nest-manager.component';

import { NestLoaderComponent } from './pages/nest-loader/nest-loader.component';
import { NestNotFoundComponent } from './pages/nest-not-found/nest-not-found.component';

import { PrimeNgModule } from '@shared/vendor/prime-ng';

@NgModule({
  declarations: [
    NestManagerComponent,
    NestLoaderComponent,
    NestNotFoundComponent,
  ],
  imports: [CommonModule, PrimeNgModule, NestManagerRoutingModule],
  exports: [NestLoaderComponent, NestNotFoundComponent],
})
export class NestManagerModule {}
