import { HttpErrorResponse } from '@angular/common/http';
import { errorListHttp } from 'src/app/interceptors/errors';

/**************************
 * ERROR OBJECTS
 * Used to receive errors acording to different
 * formats.
 * Every error received must be transformed to AngularErrror
 *
 */

export class AngularError {
  active!: boolean;
  locale!: string | null;
  code!: string | number | null;
  originalError!: any;
  originalMessage!: string | null;
  translatedMessage!: string | null;
  angularMessage!: string | null;

  constructor(error?: any) {
    !error || error == '' ? this.onEmpyError() : null;

    if (error) {
      let myError: any = this.onFullError(error);
      this.active = myError.active;
      this.locale = myError.locale;
      this.code = myError.code;
      this.originalError = myError.originalError;
      this.originalMessage = myError.originalMessage;
      this.translatedMessage = myError.translatedMessage;
      this.angularMessage = myError.angularMessage;
    }
  }

  onEmpyError() {
    this.active = true;
    this.locale = 'es';
    this.code = null;
    this.originalError = null;
    this.originalMessage = null;
    this.translatedMessage = null;
    this.angularMessage = null;
  }

  onFullError(error: any) {
    if (error instanceof DOMException) {
      console.warn({ DOMException });
      this.originalMessage = error.message;
      this.translatedMessage = error.message;
      this.angularMessage = error.message;
      this.active = true;
      return;
    }

    if (error instanceof HttpErrorResponse) {
      console.warn({ HttpErrorResponse });

      let thisError: any;

      thisError.active = true;
      thisError.locale = 'es';
      thisError.code = error.status;
      thisError.originalMessage = error.statusText;
      thisError.translatedMessage = this.httpErrorToSpanish(error.status);
      this.angularMessage =
        thisError.originalError.error.message[0].messages[0].message;
      return thisError;
    }
  }

  httpErrorToSpanish(error?: string | number | null): string {
    let result: HttpErrorModel = {
      errorCode: 0,
      errorName: 'Unknown',
      errorSpanishTranslation:
        'Error desconocido. Revise la conexion con el servidor',
      errorDef:
        'Error que no se puede traducir o el servidor está desconectado',
    };

    const translation: HttpErrorModel[] = errorListHttp.filter(
      (x: HttpErrorModel) => {
        return x.errorCode === error ? x : null;
      }
    );
    translation[0] ? (result = translation[0]) : result;
    return result.errorSpanishTranslation as string;
  }
}

/**************************************
 * Http
 */
export class HttpErrorModel {
  errorCode!: number;
  errorName!: string;
  errorSpanishTranslation!: string;
  errorDef!: string;
}

/**************************************
 * Directus
 */
export class DirectusErrorArray {
  errors!: DirectusError[];
}

export class DirectusError {
  message!: string;
  extensions!: {
    code: string;
  };
}

/**************************************
 * Nest
 */
export class NestErrorResponse {
  code!: number;
  name!: string;
  errors!: NestErrorResponseError[];
}

export class NestErrorResponseError {
  path!: string;
  method!: string;
  message!: string;
  timestamp!: string;
}

/**************************************
 * Strapi
 */
export class StrapiErrorResponse {
  statusCode!: number;
  error!: string;
  message!: Array<StrapiErrorInfo>;
  data!: Array<StrapiErrorInfo>;
}

export class StrapiErrorInfo {
  messages!: StrapiErrorMessage[];
}

export class StrapiErrorMessage {
  id!: string;
  message!: string;
}
