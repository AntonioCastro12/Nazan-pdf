import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KardexProductResponse } from '../models/inventory-kardex.response';
import { KardexProductDTO } from '../models/inventory-kardex.dto';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryKardexApiService {
  constructor(private _http: HttpClient) {}

  inventoryKardexProduct(
    dto: KardexProductDTO
  ): Observable<KardexProductResponse[]> {
    const url = `${environment.apiUrl}/api/inventories/kardex-product`;
    const params: any = {};

    params['storeId'] = dto.storeId;
    params['productId'] = dto.productId;
    params['origin'] = dto.origin;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<KardexProductResponse[]>(url, { params })
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
