import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})

export class CommonApiService {

  constructor(private _http: HttpClient) { }
  getStores(): Observable<Store[]> {
    return this._http.get<Store[]>(`${environment.utilityUrl}/api/store-info`);
  }

}
