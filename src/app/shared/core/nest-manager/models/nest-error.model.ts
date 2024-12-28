import { HttpErrorResponse } from '@angular/common/http';

import { errorListHttp } from '../helpers/errors/error-list-http.error';


/**************************
 * ERROR OBJECTS
 * Used to receive errors acording to different
 * formats.
 * Every error received must be transformed to AngularErrror
 *
 */

 export class DirectusErrorResponse {
  message!: string;
  extensions!: {
    code: string;
  };
}

export class DirectusErrorArrayResponse {
  errors!: DirectusErrorResponse[];
}


 export class HttpErrorEntity {
  errorCode!: number;
  errorName!: string;
  errorSpanishTranslation!: string;
  errorDef!: string;
}


// export class AngularErrorEntity {
//   active!: boolean;
//   locale!: string;
//   code!: string | number;
//   originalError!: any;
//   originalMessage!: any;
//   translatedMessage!: string;
//   angularMessage!: string;

//   constructor(error?: any) {
//     !error || error == '' ? this.onEmpyError() : null;

//     if (error) {
//       let myError: any = this.onFullError(error);
//       this.active = myError.active;
//       this.locale = myError.locale;
//       this.code = myError.code;
//       this.originalError = myError.originalError;
//       this.originalMessage = myError.originalMessage;
//       this.translatedMessage = myError.translatedMessage;
//       this.angularMessage = myError.angularMessage;
//     }


//   }


//   clearError(){
//     this.active = true;
//     this.locale = 'es';
//     this.code = '';
//     this.originalError = null;
//     this.originalMessage = null;
//     this.translatedMessage = '';
//     this.angularMessage = '';
//   }

//   onEmpyError() {
//     this.active = true;
//     this.locale = 'es';
//     this.code = '';
//     this.originalError = null;
//     this.originalMessage = null;
//     this.translatedMessage = '';
//     this.angularMessage = '';
//   }

//   onFullError(error: any) {
//     if (error instanceof DOMException) {
//       console.warn({ DOMException });
//       this.originalMessage = error.message;
//       this.translatedMessage = error.message;
//       this.angularMessage = error.message;
//       this.active = true;
//       return;
//     }

//     if (error instanceof HttpErrorResponse) {
//       console.warn({ HttpErrorResponse });

//       let thisError: any;

//       thisError.active = true;
//       thisError.locale = 'es';
//       thisError.code = error.status;
//       thisError.originalMessage = error.statusText;
//       thisError.translatedMessage = this.httpErrorToSpanish(error.status);
//       this.angularMessage =
//         thisError.originalError.error.message[0].messages[0].message;
//       return thisError;
//     }
//   }

//   httpErrorToSpanish(error?: string | number | null): string {
//     let result: HttpErrorEntity = {
//       errorCode: 0,
//       errorName: 'Unknown',
//       errorSpanishTranslation:
//         'Error desconocido. Revise la conexion con el servidor',
//       errorDef:
//         'Error que no se puede traducir o el servidor está desconectado',
//     };

//     const translation: HttpErrorEntity[] = errorListHttp.filter(
//       (x: HttpErrorEntity) => {
//         return x.errorCode === error ? x : null;
//       }
//     );
//     translation[0] ? (result = translation[0]) : result;
//     return result.errorSpanishTranslation as string;
//   }
// }


