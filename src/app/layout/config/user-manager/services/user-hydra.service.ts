import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStateService } from './user-state.service';
import { SharedEnvironmentService } from '@shared/services';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from '@rxweb/reactive-form-validators';

@Injectable({
  providedIn: 'root',
})
export class UserHydraService {
  constructor(
    private http: HttpClient,
    private _user: UserStateService,
    private env: SharedEnvironmentService
  ) {}

  getUserInfo(token: string): Observable<any> {
    let url = `${this.env.hydraUrl}/userinfo`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let options = { headers: headers };
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
