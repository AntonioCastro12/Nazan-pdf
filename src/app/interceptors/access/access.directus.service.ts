import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularError } from '@shared/models';

import { SharedStateService } from 'src/app/core/shared-manager/services';

@Injectable({
  providedIn: 'root',
})
export class AccessDirectusService {
  constructor(private _shared: SharedStateService) {}

  handleSuccess(event?: any) {
    this._shared.state.angularError = new AngularError();
    if (event instanceof HttpResponse) {
      this._shared.state.isLoading = false;
    }
    this._shared.state.isTokenActive = true;
    return event;
  }

  httpErrorResponseToAngularError(
    error: HttpErrorResponse,
    lang: string
  ): AngularError {
    let angularError = new AngularError();
    angularError.active = false;
    angularError.locale = lang;
    angularError.code = error.status;
    angularError.originalError = error;
    angularError.originalMessage = error.statusText;
    angularError.translatedMessage = '';
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  domExceptionToAngularError(error: DOMException, lang: string): AngularError {
    let angularError = new AngularError();
    angularError.active = false;
    angularError.locale = lang;
    angularError.code = error.message;
    angularError.originalError = error;
    angularError.originalMessage = error.message;
    angularError.translatedMessage = error.message;
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  directusResponseToAngularError(
    error: HttpErrorResponse,
    lang: string
  ): AngularError {
    console.error({ directusResponseToAngularError: error });
    let angularError = new AngularError();
    if (error.status == 200) {
      return angularError;
    } else {
      angularError.active = false;
      angularError.locale = lang;
      angularError.code = error.status;
      angularError.originalError = Array.isArray(error.error.errors)
        ? error.error.errors[0]
        : error.error.errors;
      angularError.originalMessage = Array.isArray(error.error.errors)
        ? error.error.errors[0].message
        : error.error.errors;
      angularError.angularMessage = Array.isArray(error.error.errors)
        ? error.error.errors[0].message
        : error.error.errors;
      angularError.translatedMessage = '';
      return angularError;
    }
  }
}
