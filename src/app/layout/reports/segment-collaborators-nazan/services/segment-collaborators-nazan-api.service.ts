import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments';
import {
  SegmentCollaboratorsNazanDTO,
  SegmentCollaboratorsNazanResponse,
} from '../models';
import { Favorite } from '@home-manager/models/bookmarks.model';

@Injectable({
  providedIn: 'root',
})
export class SegmentCollaboratorsNazanApiService {
  constructor(private _http: HttpClient) {}

  SegmentCollaboratorsList(): Observable<SegmentCollaboratorsNazanResponse[]> {
    const url = `${environment.apiUrl}/api/segments/collaborators-nazan`;

    let response$: any = this._http
      .get<SegmentCollaboratorsNazanResponse[]>(url)
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
