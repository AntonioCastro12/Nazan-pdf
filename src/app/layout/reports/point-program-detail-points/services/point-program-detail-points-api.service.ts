import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  PointProgramDetailPointsDTO,
  PointProgramDetailPointsResponse,
} from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class PointProgramDetailPointsApiService {
  constructor(private _http: HttpClient) {}

  detailPointsList(
    dto: PointProgramDetailPointsDTO
  ): Observable<PointProgramDetailPointsResponse[]> {
    const url = `${environment.apiUrl}/api/point-program/detail-points`;
    const params: any = {};

    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<PointProgramDetailPointsResponse[]>(url, { params })
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
