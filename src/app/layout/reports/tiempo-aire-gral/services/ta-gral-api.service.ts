import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import {taGralDTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaGralApiService {

  constructor(
    private _http: HttpClient,
  ) { }

  getTaGral(dto:taGralDTO){
    const url= `${environment.apiUrl}/api/airtime/general`
    const params: any = {};
    params['storeId'] = dto.storeId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }


}
