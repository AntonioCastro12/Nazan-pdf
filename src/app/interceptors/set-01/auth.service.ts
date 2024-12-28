import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedEnvironmentService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: any;

  private accessToken: any;
  private refreshToken: any;

  constructor(
    private http: HttpClient,
    private env: SharedEnvironmentService,
    private cookieService: CookieService,
    private sharedState: SharedStateService,
    private router: Router
  ) {
    this.accessToken;
    this.refreshToken;
    this.apiUrl = this.env.apiUrl;
  }

  // implement login functionality
  login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    return this.http.post(`${this.apiUrl}/auth/login`, body).pipe(
      tap((response: DirectusLoginResponse) => {
        this.cookieService.set(
          'access_token',
          response?.data?.access_token as string
        );
        this.cookieService.set(
          'refresh_token',
          response?.data?.refresh_token as string
        );
        sessionStorage.setItem(
          'access_token',
          response?.data?.access_token as string
        );
        sessionStorage.setItem(
          'refresh_token',
          response?.data?.refresh_token as string
        );
        this.sharedState.stateTemp.isAuthenticated = true;
        this.sharedState.stateTemp.accessControl.isLogged = true;
        // sessionStorage.setItem('currentSession', JSON.stringify(response));
      })
    );
  }

  // implement logout functionality
  logout() {
    sessionStorage.clear();
    sessionStorage.clear();
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.sharedState.stateTemp.accessControl.isLogged = false;
    this.router.navigate(['/landing-manager/login']);
  }

  // implement refresh token functionality
  refreshAccessToken() {
    const refreshToken = {
      refresh_token: sessionStorage.getItem('refresh_token'),
    };
    return this.http
      .post(`${this.apiUrl}/auth/refresh`, refreshToken)
      .pipe(map((data: DirectusLoginResponse) => data));
  }

  // get access token from cookies
  getAccessToken() {
    return (
      this.cookieService.get('access_token') ||
      sessionStorage.getItem('access_token')
    );
  }

  getUser(): Observable<UserEntity> {
    this.sharedState.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/users/me?fields=*.*.*`;
    let response = this.http
      .get<UserEntity>(url)
      .pipe(map((data: any) => data.data));
    return response;
  }
}
