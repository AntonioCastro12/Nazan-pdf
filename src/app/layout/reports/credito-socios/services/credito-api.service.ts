import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import {
  creditoSocioDTO,
  TicketDetailDTO
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CreditoApiService {
  constructor(private _http: HttpClient) {}

  membershipCreditHistory(dto:creditoSocioDTO){
    const url= `${environment.apiUrl}/api/membership-credit/credit-history`
    const params: any = {};
    params['memberId'] = dto.memberId;
    params['startDate'] = dto.startDate;
    params['endDate'] = dto.endDate;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }

  // ticketDetail(dto:creditoSocioDTO){
  ticketDetail(dto:TicketDetailDTO){
    const url= `${environment.apiUrl}/api/membership-credit/ticket-resume`
    const params: any = {};
    params['store'] = dto.store;
    params['date'] = dto.date;
    params['ticketNumber'] = dto.ticketNumber;
    params['cashRegister'] = dto.cashRegister;
    let response$: any = this._http
      .get<any[]>(url, { params });
    return response$;
  }


}
