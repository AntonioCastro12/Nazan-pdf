import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AngularError } from '@shared/models';

import { ToastrService } from 'ngx-toastr';
import { AccessDirectusService } from '../access/access.directus.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private accessDirectusService: AccessDirectusService,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        errorMessage;
        let angularError = new AngularError();
        if (error.status === 401) {
          console.error('ERROR TOKEN EXPIRED');
        }

        if (!navigator.onLine) {
          // Handle offline error
          console.error('OFFLINE');
          errorMessage = `Error: ${error.error.message}`;
          angularError.angularMessage = 'No internet connection. Offline';
          this.toastr.error('OFFLINE', angularError.angularMessage as string);
        } else if (error.error instanceof ErrorEvent) {
          // client-side error
          console.error('CLIENT SIDE ERROR');
          errorMessage = `Error: ${error.error.message}`;
          angularError.angularMessage = 'Error on client side';
          this.toastr.error(
            'CLIENT SIDE ERROR',
            angularError.angularMessage as string
          );
        } else {
          // server-side error
          console.error('SERVER SIDE ERROR', error);
          errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;

          angularError =
            this.accessDirectusService.directusResponseToAngularError(
              error,
              'en'
            );
          console.error({ angularError });
          this.toastr.error(
            'SERVER SIDE ERROR',
            angularError.originalError.message as string
          );
        }

        return throwError(() => angularError);
      }),
      tap(() => {
        // this.sharedState.stateTemp.accessControl.isLoading = false;
      })
    );
  }
}
