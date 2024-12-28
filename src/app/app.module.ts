import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SsoComponent } from './sso/sso.component';
import { MyLoaderModule } from './core/loader/loader.module';
import { AuthManagerModule } from './layout/modules/auth-manager/auth-manager.module';
import { AuthStateService } from './layout/modules/auth-manager/services/auth-state.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/set-03';
import { WINDOW_PROVIDERS } from './window.provider';
import { ExitPageComponent } from './pages/exit-page/exit-page.component';
import { PrimeNgModule } from '@shared/vendor/prime-ng';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent, SsoComponent, ExitPageComponent],
  imports: [
    PrimeNgModule,
    CheckboxModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyLoaderModule,
    AuthManagerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot(),
  ],
  providers: [
    ConfirmationService,
    MessageService,
    AuthStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
