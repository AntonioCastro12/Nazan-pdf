import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserStateService } from './user-state.service';
import { Observable, map, retry, tap } from 'rxjs';
import { UserEntity } from '@user-manager/models';
import { AngularError } from '@shared/models/system';
import { StoreStateService } from 'src/app/layout/config/store-manager/services';
import { SharedEnvironmentService } from '@shared/services';
import { StoreEntity } from 'src/app/layout/config/store-manager/models';
import { SharedStateService } from 'src/app/core/shared-manager/services';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(
    private http: HttpClient,
    private _user: UserStateService,
    private _store: StoreStateService,
    private env: SharedEnvironmentService,
    private _shared: SharedStateService
  ) {}

  postUserItem(user: UserEntity): Observable<UserEntity> {
    let url = `${this.env.apiUrl}/api/user-module`;
    const response = this.http.post<UserEntity>(url, user).pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        this._user.state.userSelected = data;
      })
    );
    return response;
  }

  getUserList(): Observable<UserEntity[]> {
    let url = `${this.env.apiUrl}/api/user-module`;
    const response = this.http.get<UserEntity[]>(url).pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        this._user.state.userList = data;
      })
    );
    return response;
  }

  getUserFilterList(search: string): Observable<UserEntity[]> {
    let url = `${this.env.apiUrl}/api/user-module/search${search}`;
    const response = this.http.get<UserEntity[]>(url).pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        this._user.state.userList = data;
      })
    );
    return response;
  }

  // getUserItem<T>(user: UserEntity): Observable<UserEntity> {
  //   let url = `${this.env.apiUrl}/api/user-module/${user.id}`;
  //   const response = this.http.get<UserEntity>(url).pipe(
  //     map((response: any) => response.data),
  //     tap((data: any) => {
  //       this._user.state.userSelected = data;
  //     })
  //   );
  //   return response;
  // }

  // patchUserItem(user: UserEntity): Observable<UserEntity> {
  //   let url = `${this.env.apiUrl}/api/user-module/${user.id}`;
  //   const response = this.http.patch<UserEntity>(url, user).pipe(
  //     map((response: any) => response.data),
  //     tap((data: any) => {
  //       this._user.state.userSelected = data;
  //     })
  //   );
  //   return response;
  // }

  deleteUserItem(user: UserEntity) {
    // let url = `${this.env.apiUrl}/api/user-module/${user.id}`;
    // const response = this.http.delete<UserEntity>(url).pipe(
    //   map((response: any) => response),
    //   tap((response: any) => {
    //     this._user.state.userSelected = response;
    //   })
    // );
  }

  deleteUserList(itemList: UserEntity[]): Observable<UserEntity> {
    this._shared.state.angularError = new AngularError();
    const url = `${this.env.apiUrl}/api/user-module/deleteAll`;
    let response = this.http.post<any>(url, itemList).pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        this._user.state.userSelected = data;
      })
    );
    return response;
  }

  getStoreList(): Observable<StoreEntity[]> {
    let url = `${this.env.utilityUrl}/api/store-info`;
    const response = this.http.get<StoreEntity[]>(url).pipe(
      map((response: any) => response),
      tap((data: any) => {
        this._store.state.storeList = data;
      })
    );
    return response;
  }

  getStoreFilterList(search: string): Observable<StoreEntity[]> {
    let url = `${this.env.utilityUrl}/api/store-info/findByFilter`;
    const response = this.http.post<StoreEntity[]>(url, search).pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        this._store.state.storeList = data;
      })
    );
    return response;
  }
}
