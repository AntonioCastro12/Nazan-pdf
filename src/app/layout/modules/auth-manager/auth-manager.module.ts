import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from './services/auth-state.service';
import { AuthApiService } from './services/auth-api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    //AuthStateService,
    AuthApiService,
  ],
})
export class AuthManagerModule {}
