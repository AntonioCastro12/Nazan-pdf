import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const startTime = new Date().getTime();

    return next.handle(req).pipe(
      map((response: HttpEvent<any>) => {
        const endTime = new Date().getTime();
        const finalTime = endTime - startTime;
        console.warn({ response, url: response.type.valueOf, finalTime });
        return response;
      })
    );
  }
}
