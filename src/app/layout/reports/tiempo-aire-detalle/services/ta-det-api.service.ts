import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import {taDetDTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaDetApiService {
  constructor(
    private _http: HttpClient,
  ) { }

  getTaDet(dto:taDetDTO){
    const url= `${environment.apiUrl}/api/airtime/detalles`
    const params: any = {};
    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }
}
