import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedEnvironmentService } from '@shared/services';
import { StoreStateService } from './store-state.service';
import { StoreResponse } from 'src/app/layout/config/store-manager/models';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  constructor(
    private http: HttpClient,
    private env: SharedEnvironmentService,
    private _store: StoreStateService
  ) {}

  getStoreList(): Observable<StoreResponse[]> {
    let url = `${this.env.utilityUrl}/api/store-info`;
    const response = this.http
      .get<StoreResponse[]>(url)
      .pipe(map((response: any) => response));
    return response;
  }
}
