import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import { PointProgramDetailWalletDTO } from '../models';
import { PointProgramDetailWalletResponse } from '../models/point-program-detail-wallet.response';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class PointProgramDetailWalletApiService {
  constructor(private _http: HttpClient) {}

  detailWalletList(
    dto: PointProgramDetailWalletDTO
  ): Observable<PointProgramDetailWalletResponse[]> {
    const url = `${environment.apiUrl}/api/point-program/detail-wallet`;
    const params: any = {};

    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<PointProgramDetailWalletResponse[]>(url, { params })
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
