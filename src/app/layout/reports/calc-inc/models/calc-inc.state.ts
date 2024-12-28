import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './calc-inc.dto';
import {
  catActuales,
  descPred,
  taGralResponse,
  predeterminadoResponse,
  personalizadoResponse
} from './calc-inc.response';

export class TaGralResumeState {

  // tipo de calculo 
  /*
  1.Predeterminado
  2.Personalizado Gral
  3.Personalizado Diferenciado
  */
  tipoCalculo: number = 1;

  //Datos del header predeterminado
  headerPredeterminado: any[] = [
    'ID',
    'Titulo',
    'Descripción',
    'Precio',
    'Link',
    'Marca',
    'Talla',
    'Color'
  ]

  // Datos del header personalizado
  headerPersonalizado: any[] = [
    'Codigo internet',
    'Descripción',
    'Precio calculado',
    'Precio',
    'Titulo'
  ]


  //Descuentos predeterminados
  descPredeterminado: descPred[] = [
    {
      descuento: "10%",
      idDescuento: "10"
    },
    {
      descuento: "20%",
      idDescuento: "20"
    },
    {
      descuento: "30%",
      idDescuento: "30"
    },
    {
      descuento: "40%",
      idDescuento: "40"
    },
    {
      descuento: "50%",
      idDescuento: "50"
    },
    {
      descuento: "60%",
      idDescuento: "60"
    },
    {
      descuento: "70%",
      idDescuento: "70"
    },
    {
      descuento: "50% N - 30% I",
      idDescuento: "NI"
    },
  ];

  // Recepcion de aumentos predeterminados 
  predeterminadoResponse: predeterminadoResponse[] = [];

  //Recepción de personalizados
  personalizadoResponse: personalizadoResponse[] = [];

  //Recepcion de catalogos
  catActuales: catActuales[] = [];

  //seleccionar tipo de calculo
  predeterminado = true;
  //seleccionar tipo de calculo personalizado
  PersonalizadoGral = true;

  //datos de credito recepcion
  taGralDTO: taGralDTO = new taGralDTO;
  taGralResponse: taGralResponse[] = [];

  currentStore!: string;
  form!: UntypedFormGroup;

  isLoadingCatalogues: boolean = false;
  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
