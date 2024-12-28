import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderKillInterceptorService {
  constructor(private sharedState: SharedStateService) {
    this.sharedState;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.sharedState.stateTemp.accessControl.isLoading = false;

    return next.handle(request);
  }
}
