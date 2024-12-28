import { identifierName } from '@angular/compiler';

export class taGralDTO {
  storeId: string = '';
  startDate: string='';
  endDate: string ='';
}

export class predeterminadoDTO{
  catalogos:string='';
  incremento: string ='';
  cEspecial: number = 0;
}

export class perGeneralDTO{
  catalogos:string='';
  gralBase: string = '';
  gralSocio: string = '';

}

export class personalizadoDTO{
  catalogos:string='';
  incremento: number = 0;
  //diferenciado importado
  base: string ='';
  socio: string = '';
  //Diferenciado nacional
  baseI?: string = '';
  socioI?: string = '';
}