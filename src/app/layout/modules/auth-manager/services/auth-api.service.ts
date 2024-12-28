import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../models/auth.state';
import { UserInfoEntity } from '../models/auth.entity';
import { SharedEnvironmentService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(
    private _http: HttpClient,
    private env: SharedEnvironmentService,
    private http: HttpClient
  ) {}

  getUserInfo(token: string): Observable<UserInfoEntity> {
    let url = `${this.env.hydraUrl}/userinfo`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    let body = {};

    const response = this.http
      .post(url, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map((response: any) => response),
        catchError((err, caught) => caught)
      );
    return response;
  }
}
