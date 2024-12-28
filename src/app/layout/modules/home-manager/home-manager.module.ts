import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeManagerRoutingModule } from './home-manager-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeManagerRoutingModule,
    PrimeNgModule
  ],
  providers: [
  ]
})
export class HomeManagerModule { }
