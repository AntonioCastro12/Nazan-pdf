import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  PointProgramTotalMovementDTO,
  PointProgramTotalMovementResponse,
} from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class PointProgramTotalMovementApiService {
  constructor(private _http: HttpClient) {}

  pointProgramTotalMovement(
    dto: PointProgramTotalMovementDTO
  ): Observable<PointProgramTotalMovementResponse[]> {
    const url = `${environment.apiUrl}/api/point-program/total-movement`;
    const params: any = {};

    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;

    let response$: any = this._http
      .get<PointProgramTotalMovementResponse[]>(url, { params })
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
