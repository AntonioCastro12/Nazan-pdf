import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccessDirectusService } from '../access';
import { ToastrService } from 'ngx-toastr';
import { AngularError } from '../../shared/models/system/shared-system.error';
import { SharedEnvironmentService } from '@shared/services';
import { DirectusLoginResponse } from 'src/app/core/shared-manager/models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private http: HttpClient,
    private env: SharedEnvironmentService,
    private accessDirectusService: AccessDirectusService,
    private toastr: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let angularError = new AngularError();
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Handle Refresh Token and update Access Token...
          angularError =
            this.accessDirectusService.directusResponseToAngularError(
              error,
              'en'
            );
          this.toastr.error(
            angularError.angularMessage as string,
            '401 Unauthorized​'
          );
          this.refreshAccessToken().subscribe({
            next: (token) => {
              let result: DirectusLoginResponse =
                token as DirectusLoginResponse;
              const updated_access_token = sessionStorage.setItem(
                'access_token',
                JSON.stringify(result.data?.access_token)
              );
              sessionStorage.setItem(
                'refresh_token',
                JSON.stringify(result.data?.refresh_token)
              );
              const reAuthReq = req.clone({
                headers: req.headers.set(
                  'Authorization',
                  `Bearer ${updated_access_token}`
                ),
              });
              return next.handle(reAuthReq);
            },
          });
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          // Not authorized
          angularError =
            this.accessDirectusService.directusResponseToAngularError(
              error,
              'en'
            );
          this.toastr.error(
            angularError.angularMessage as string,
            'ACCESS DENIED'
          );
          this.router.navigate(['access-denied']);
        } else if (error instanceof HttpErrorResponse && error.status === 0) {
          // Handle network error...

          angularError =
            this.accessDirectusService.directusResponseToAngularError(
              error,
              'en'
            );
          console.warn('No internet connection');
          this.toastr.error('No internet connection', 'OFFLINE');
        } else {
          angularError =
            this.accessDirectusService.directusResponseToAngularError(
              error,
              'en'
            );
        }

        return throwError(() => angularError);
      })
    );
  }

  refreshAccessToken() {
    const refreshToken = {
      refresh_token: sessionStorage.getItem('refresh_token'),
    };
    return this.http
      .post(`${this.env.apiUrl}/auth/refresh`, refreshToken)
      .pipe(map((data) => data));
  }
}
