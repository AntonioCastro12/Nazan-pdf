import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth3Service {
  private accessToken: string;
  private refreshToken: string;

  constructor(private router: Router) {
    this.accessToken = sessionStorage.getItem('access_token') as string;
    this.refreshToken = sessionStorage.getItem('refresh_token') as string;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    sessionStorage.setItem('access_token', token);
    document.cookie = `access_token=${token}`;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
    sessionStorage.setItem('refresh_token', token);
    document.cookie = `refresh_token=${token}`;
  }

  logout() {
    sessionStorage.clear();
    sessionStorage.clear();

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.router.navigate(['/landing-manager/login']);
  }
}
