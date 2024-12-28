import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './set-01/token.interceptor.service';
import { ErrorInterceptorService } from './set-01/error.interceptor.service';
import { RetryInterceptor } from './set-01/retry.interceptor.service';

export const interceptorProviders01 = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RetryInterceptor,
    multi: true,
  },
];
