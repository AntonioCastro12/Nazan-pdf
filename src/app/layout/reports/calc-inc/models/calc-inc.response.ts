

export class catActuales {
  // Catalogo: string | null | undefined = null;
  // Id: string | null | undefined = null;
  Id_Catalogo	: string | null | undefined = null;
  Nombre	: string | null | undefined = null;
}

export class descPred {
  descuento: string | null | undefined = null;
  idDescuento: string | null | undefined = null;
}

export class taGralResponse {
  business_date: string | null | undefined = null;
  item_desc: string | null = null;
  item_id: string | null = null;
  quantity: number = 0;
  rtl_loc_id: number = 0;
  total: string | null = null;
}

export class predeterminadoResponse {
  CODIGO_INTERNET: string | null | undefined = null;
  TITLE: string | null | undefined = null;
  DESCRIPTION: string | null | undefined = null;
  PRICE: number = 0;
  CURRENT_PRICEMEMBER: number = 0;
  N50_I30: number = 0; //Se va a cambiar
  Link: string | null | undefined = null;
  Image_Link: string | null | undefined = null;
  Additional_Image_Link: string | null | undefined = null;
  BRAND: string | null | undefined = null;
  SIZE_EXTENDED: string | null | undefined = null;
  COLOR: string | null | undefined = null;
  Diez?:number
  Veinte?:number
  Treinta?:number

  //Faltan los precios con descuento
}

export class personalizadoResponse {
  CODIGO_INTERNET: string | null | undefined = null;
  DESCRIPCION: string | null | undefined = null;
  PRECIO_CALCULADO: number = 0;
  PRICE: number = 0;
  TITLE: string | null | undefined = null;
}
