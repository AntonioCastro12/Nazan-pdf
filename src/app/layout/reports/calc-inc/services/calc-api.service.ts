import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import {predeterminadoDTO, personalizadoDTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalcApiService {

  constructor(
    private _http: HttpClient,
  ) { }

  catActuales(){
    const url= `${environment.apiUrl}/api/cat-calculator/cat-disponibles`
    let response$: any = this._http
      .get<any[]>(url);
    return response$;
  }

  calcPredeterminado(dto: predeterminadoDTO){
    const url = `${environment.apiUrl}/api/cat-calculator/predet`;
    const params: any = {};
    params['catalogos'] =dto.catalogos;
    params['incremento'] = dto.incremento;
    params['cEspecial'] = dto.cEspecial

    let response$: any = this._http.get<any[]>(url, {params});
    return response$;
  }


  calcPerzonalizado(dto: personalizadoDTO){
    const url = `${environment.apiUrl}/api/cat-calculator/personalizado`;
    const params: any = {};
    params['catalogos'] = dto.catalogos;
    params['incremento'] = dto.incremento;
    params['base'] = dto.base;
    params['socio'] = dto.socio;
    params['baseI'] = dto.baseI;
    params['socioI'] = dto.socioI;

    console.log('ESTOS SON LOS PARAMETROS')
    console.log(params)
    let response$: any = this._http.get<any[]>(url, {params});
    return response$;
  }
}
