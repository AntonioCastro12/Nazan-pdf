import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import { OrdersDashboardResponse } from '../models/orders-dashboard.response';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersDashboardApiService {
  constructor(private _http: HttpClient) {}

  ordersDashboardInfo(store: string): Observable<OrdersDashboardResponse> {
    //const url = `http://localhost:3151/api/orders-dashboard?storeId=${store}`;
    const url = `${environment.apiUrl}/api/orders-dashboard?storeId=${store}`;
    let response$: any = this._http
      .get<OrdersDashboardResponse>(url)
      .pipe(map((data: any) => data));
    return response$;
  }
}
