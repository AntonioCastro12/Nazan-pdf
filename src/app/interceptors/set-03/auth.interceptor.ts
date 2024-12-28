import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string = '';

    if (!sessionStorage.getItem('access_token')) {
      return next.handle(req);
    } else {
      token = sessionStorage.getItem('access_token') as string;
    }

    // Clone the request to have authorization header
    let request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   let token: string = '';

  //   if (!sessionStorage.getItem('access_token')) {
  //     return next.handle(req);
  //   } else {
  //     token = sessionStorage.getItem('access_token') as string;
  //   }

  //   const authReq = req.clone({
  //     headers: req.headers.set(
  //       'Authorization',
  //       `Bearer ${sessionStorage.getItem('access_token') ?? ''}`
  //     ),
  //   });
  //   return next.handle(authReq);
  // }
}
