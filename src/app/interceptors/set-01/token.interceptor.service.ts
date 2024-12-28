import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this.cookieService.check('access_token') &&
      !sessionStorage.getItem('access_token')
    ) {
      return next.handle(request);
    }

    if (
      !this.cookieService.check('access_token') &&
      sessionStorage.getItem('access_token')
    ) {
      this.cookieService.set(
        'access_token',
        sessionStorage.getItem('access_token') as string
      );
      this.cookieService.set(
        'refresh_token',
        sessionStorage.getItem('refresh_token') as string
      );
    }

    // Clone the request to have authorization header
    const token = this.cookieService.get('access_token')
      ? this.cookieService.get('access_token')
      : sessionStorage.getItem('access_token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request).pipe(
      switchMap(
        (event: HttpEvent<any>) => {
          return of(event);
        },
        (err: any) => {
          if (err.status === 401) {
            // this.authService.refreshAccessToken().subscribe({
            //   next: (response: any) => {
            //     console.error('ERROR 401', { response });
            //     this.cookieService.set(
            //       'access_token',
            //       response?.data?.access_token as string
            //     );
            //     sessionStorage.setItem(
            //       'access_token',
            //       response?.data?.access_token as string
            //     );
            //     this.cookieService.set(
            //       'refresh_token',
            //       response?.data?.refresh_token as string
            //     );
            //     sessionStorage.setItem(
            //       'refresh_token',
            //       response?.data?.refresh_token as string
            //     );
            //   },
            //   error: (error: any) => {
            //     console.error(error);
            //   },
            //   complete: () => {},
            // });
            // return this.authService.refreshAccessToken().pipe(
            //   switchMap(() => {
            //     const newToken = this.authService.getAccessToken();
            //     request = request.clone({
            //       setHeaders: {
            //         Authorization: `Bearer ${newToken}`,
            //       },
            //     });
            //     return next.handle(request);
            //   }),
            //   tap((x) => {
            //     console.error('refreshAccessToken');
            //   })
            // );
          }
          return err;
        }
      )
    );
  }
}
