import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from './token.service';
import { Auth2Service } from './auth2.service';


@Injectable()
export class DirectusInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: Auth2Service,
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.authService.getAccessToken();

    if (token) {
      req = this.getNewRequestWithToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.tokenService.refreshToken().pipe(
              switchMap((response: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(response.access_token);
                return next.handle(
                  this.getNewRequestWithToken(req, response.access_token)
                );
              }),
              catchError((error: HttpErrorResponse) => {
                this.isRefreshing = false;
                this.authService.logout();
                return throwError(error);
              })
            );
          } else {
            return this.refreshTokenSubject.pipe(
              switchMap((token: string) => {
                if (token) {
                  return next.handle(this.getNewRequestWithToken(req, token));
                } else {
                  this.authService.logout();
                  return throwError(error);
                }
              })
            );
          }
        }

        return throwError(error);
      })
    );
  }

  private getNewRequestWithToken(req: HttpRequest<any>, token: string) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return clonedReq;
  }
}
