import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { AuthService } from '../set-01';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  refreshToken() {
    const refreshToken = this.authService.getRefreshToken();

    if (refreshToken) {
      return this.httpClient
        .post<any>('/api/refresh', { token: refreshToken })
        .pipe(
          tap((response) => {
            if (response.access_token) {
              this.authService.setAccessToken(response.access_token);
            }
          })
        );
    } else {
      return of('');
    }
  }
}
