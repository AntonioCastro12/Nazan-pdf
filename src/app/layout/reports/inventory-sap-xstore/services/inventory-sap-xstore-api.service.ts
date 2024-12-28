import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { InventorySapXstoreDTO, InventorySapXstoreResponse } from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class InventorySapXstoreApiService {
  constructor(private _http: HttpClient) {}

  inventorySapXstore(
    dto: InventorySapXstoreDTO
  ): Observable<InventorySapXstoreResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/sap-xstore`;
    const params: any = {};

    params['storeId'] = dto.storeId;

    let response$: any = this._http
      .get<InventorySapXstoreResponse[]>(url, { params })
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
