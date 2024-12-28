import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './set-03/';
import { ErrorInterceptor } from './set-03';
import { RetryInterceptor } from './set-03';

export const interceptorProviders03 = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RetryInterceptor,
    multi: true,
  },
];
