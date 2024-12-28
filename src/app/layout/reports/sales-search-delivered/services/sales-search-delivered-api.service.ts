import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { SalesSearchDeliveredDTO } from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class SalesSearchDeliveredApiService {
  constructor(private _http: HttpClient) {}

  getList(dto: SalesSearchDeliveredDTO): Observable<any> {
    const url = `${environment.apiUrl}/api/sales/products-delivered?storeId=${dto.storeId}`;
    let response$: any = this._http
      .get<any>(url)
      .pipe(map((data: any) => data));
    return response$;
  }

  favorite(data: any): Observable<Favorite> {
    return this._http.post<Favorite>(
      `${environment.apiUrl}/api/bookmarks/favorites`,
      data
    );
  }
}
