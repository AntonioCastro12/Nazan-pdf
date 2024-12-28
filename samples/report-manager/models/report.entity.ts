import { ID_DATA_NAME } from 'src/app/shared/functions/functions';

export class ReportList {
  total: number = 0;
  data: any[] = [];
}
export class SalesWholesale {
  [ID_DATA_NAME]?: number;
  Tienda: number = 0;
  Fecha: string = '';
  Num_Colaborador: string = '';
  Colaborador: string = '';
  Transacciones_Totales: number = 0;
  Total_Pares: number = 0;
  Transacciones_1_Par: number = 0;
  Transacciones_2_Par: number = 0;
  Transacciones_3_o_Mas_Par: number = 0;
  Mayoreos: number = 0;
}

export const salesWholesaleLabels = {
  Tienda: 'Tienda',
  Fecha: 'Fecha',
  Num_Colaborador: 'Num Colaborador',
  Colaborador: 'Colaborador',
  Transacciones_Totales: 'Transacciones totales',
  Total_Pares: 'Total pares',
  Transacciones_1_Par: 'Transacciones 1 par',
  Transacciones_2_Par: 'Transacciones 2 par',
  Transacciones_3_o_Mas_Par: 'Transacciones 3 o mas par',
  Mayoreos: 'Mayoreos',
};

export class InventoryKardex {
  [ID_DATA_NAME]?: number;
  store_id: number = 0;
  trans_seq: string = '';
  ws_id: string = '';
  create_date: string = 'null';
  origin_bucket: string = '';
  destiny_bucket: string = '';
  action_code: string = '';
  item_id: string = '';
  description: string = '';
  document: string = '';
  qty: number = 0;
  on_hand: number = 0;
  time_trans: string = '';
  on_order: number = 0;
}

export const inventoryKardexLabels = {
  store_id: 'Tienda',
  trans_seq: 'Transacción',
  create_date: 'Creación',
  origin_bucket: 'Bloque origen',
  destiny_bucket: 'Bloque destino',
  action_code: 'Acción',
  item_id: 'Artículo',
  sku: 'SKU',
  document: 'Documento',
  qty: 'Cantidad',
};

export const inventoryStockResumeLabels = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad',
};

export class InventoryStockResume {
  [ID_DATA_NAME]?: number;
  line: string = '';
  qty: number = 0;
}

export const inventoryStockDetailLabels = {
  sku: 'SKU',
  createDate: 'Fecha',
  line: 'línea',
  description: 'Descripción',
  qty: 'Cantidad',
};

export class InventoryStockDetail {
  [ID_DATA_NAME]?: number;
  storeId: string = '';
  itemId: string = '';
  sku: string = '';
  description: string = '';
  department: string = '';
  line: string = '';
  family: string = '';
  subFamily: string = '';
  size: string = '';
  block: string = '';
  qty: number = 0;
  createDate: string = '';
  updateDate: string = '';
  userUpdate: string = '';
}

export class InventoryComparison {
  [ID_DATA_NAME]?: number;
  productId: string = '';
  storeId: string = '';
  xstore_qty: string = '';
  xcenter_qty: string = '';
  atg_qty: string = '';
  orderbroker_qty: string = '';
}

export const inventoryComparisonLabels = {
  productId: 'Producto',
  storeId: 'Tienda',
  xstore_qty: 'Cantidad xStore',
  xcenter_qty: 'Cantidad xCenter',
  atg_qty: 'Cantidad ATG',
  orderbroker_qty: 'Cantidad Order-Broker',
};

export class InventorySapXstore {
  [ID_DATA_NAME]?: number;
  store_id: number = 0;
  material: string = '';
  year: number = 0;
  sap: number = 0;
  xstore: number = 0;
  difference: number = 0;
  abs: number = 0;
}

export const inventorySapXstoreLabels = {
  store_id: 'Tienda',
  material: 'Material',
  year: 'Año',
  sap: 'Sap',
  xstore: 'Xstore',
  difference: 'Diferencia',
  abs: 'ABS',
};

export class InventoryPod {
  [ID_DATA_NAME]?: number;
  T_ORIGEN: string = '';
  NOMBRE_TDA_ORIGEN: string = '0';
  T_DESTINO: number = 0;
  L_EMBARQUE: string = '';
  TIPO_EMBARQUE: string = '';
  FEC_CREA_SISTEMA: string = '';
  FEC_HORA_POD: string = '';
  FEC_HORA_CIERRE: string = '';
  TIEMPO_HRS: number = 0;
  ESTATUS: string = '';
}

export const inventoryPodLabels = {
  T_ORIGEN: 'Tienda origen',
  NOMBRE_TDA_ORIGEN: 'Nombre tienda origen',
  T_DESTINO: 'Tienda destino',
  L_EMBARQUE: 'Linea de embarque',
  TIPO_EMBARQUE: 'Tipo embarque',
  FEC_CREA_SISTEMA: 'Fecha creacion sistema',
  FEC_HORA_POD: 'Fecha/Hora recepcion',
  FEC_HORA_CIERRE: 'Fecha/Hora cierre',
  TIEMPO_HRS: 'Tiempo',
  ESTATUS: 'Estatus',
};

export class CycleCount {
  [ID_DATA_NAME]?: number = 0;
  rtl_loc_id: number = 0;
  ID_CONTEO: string = '';
  TIPO_CONTEO: string = '';
  MARCA: string = '';
  FECHA_INICIAL: string = '';
  FECHA_FINAL: string = '';
  count_status: string = '';
  CANT_ITEMS: number = 0;
}

export const inventoryCycleCountLabels = {
  rtl_loc_id: 'Id tienda',
  ID_CONTEO: 'Id conteo',
  TIPO_CONTEO: 'Tipo conteo',
  MARCA: 'Marca',
  FECHA_INICIAL: 'Fecha inicial',
  FECHA_FINAL: 'Fecha final',
  count_status: 'Estado del conteo',
  CANT_ITEMS: 'Cantidad items',
};

export class PointProgramDetailPoints {
  [ID_DATA_NAME]?: number;
  'NUM SOCIO': string = '';
  'NOM CORTO': string = '';
  'NOMBRE SOCIO': string = '';
  'NIVEL': string = '';
  'PUNTOS OTROGADOS': number = 0;
  'TIENDA': number = 0;
  'TRANSACCION': number = 0;
  'CAJA': number = 0;
  'FECHA ACTIVIDAD': string = '';
  'ACTIVIDAD': string = '';
}
export const pointProgramDetailPointsLabels = {
  'NUM SOCIO': 'Socio',
  'NOM CORTO': 'Nombre corto',
  'NOMBRE SOCIO': 'Nombre',
  NIVEL: 'Nivel',
  'PUNTOS OTORGADOS': 'Puntos otorgados',
  TIENDA: 'Tienda',
  TRANSACCION: 'Transacción',
  CAJA: 'Caja',
  'FECHA ACTIVIDAD': 'Fecha',
  ACTIVIDAD: 'Actividad',
};

export class PointProgramDetailWallet {
  [ID_DATA_NAME]?: number;
  'NUM SOCIO': string = '';
  'NOM CORTO': string = '';
  'NOMBRE SOCIO': string = '';
  'NIVEL': string = '';
  'MONTO': number = 0;
  'TIENDA': number = 0;
  'TRANSACCION': number = 0;
  'CAJA': number = 0;
  'FECHA ACTIVIDAD': string = '';
  'ACTIVIDAD': string = '';
}
export const pointProgramDetailWallet = {
  'NUM SOCIO': 'Socio',
  'NOM CORTO': 'Nombre corto',
  'NOMBRE SOCIO': 'Nombre',
  NIVEL: 'Nivel',
  MONTO: 'Monto',
  TIENDA: 'Tienda',
  TRANSACCION: 'Transacción',
  CAJA: 'Caja',
  'FECHA ACTIVIDAD': 'Fecha',
  ACTIVIDAD: 'Actividad',
};

export class PointProgramTotalMovement {
  [ID_DATA_NAME]?: number;
  'NUM SOCIO': string = '';
  'NOM CORTO': string = '';
  'NOMBRE SOCIO': string = '';
  'NIVEL': string = '';
  'PUNTOS OTROGADOS': number = 0;
  'TIENDA': number = 0;
  'TRANSACCION': number = 0;
  'CAJA': number = 0;
  'FECHA ACTIVIDAD': string = '';
  'ACTIVIDAD': string = '';
}

export const pointProgramTotalMovementLabels = {
  'NUM SOCIO': 'Socio',
  'NOM CORTO': 'Nombre corto',
  'NOMBRE SOCIO': 'Nombre',
  NIVEL: 'Nivel',
  'PUNTOS OTROGADOS': 'Puntos otragados',
  TIENDA: 'Tienda',
  TRANSACCION: 'Transacción',
  CAJA: 'Caja',
  'FECHA ACTIVIDAD': 'Fecha',
  ACTIVIDAD: 'Actividad',
};

export class SalesInvoiceTotal {
  [ID_DATA_NAME]?: number;
  storeId: string = '';
  businessDate: string = '';
  saleTypeSale: string = '';
  totalMoneySale: number = 0;
  totalUnitSale: number = 0;
  countInvoiceSale: number = 0;
  saleTypeReturn: string = '';
  totalMoneyReturn: number = 0;
  totalUnitReturn: number = 0;
  countInvoiceReturn: number = 0;
  saleTypeFreight: string = '';
  totalMoneyFreight: number = 0;
  totalUnitFreight: number = 0;
  countInvoiceFreight: number = 0;
  unitPercentReturn: number = 0;
  totalPercentReturn: number = 0;
}

export const salesInvoiceTotalLabels = {
  storeId: 'Tienda',
  businessDate: 'Fecha',
  countInvoiceSale: 'Cantidad facturas',
  totalUnitSale: 'Ventas unidades',
  totalUnitReturn: 'Devoluciones unidades',
  unitPercentReturn: '% Devoluciones unidades',
  totalUnitFreight: 'Cantidad fletes',
  totalMoneySale: '$ Ventas',
  totalMoneyFreight: '$ Flete',
  totalMoneyReturn: '$ Devoluciones',
  totalPercentReturn: '% Devoluciones $',
  avgSales: 'Promedio ventas $',
};

export class SalesGeneralSales {
  [ID_DATA_NAME]?: number;
  titleLine: string = '';
  countTransactions: number = 0;
  totalMoney: number = 0;
}
export const salesGeneralSalesLabels = {
  titleLine: 'Texto',
  countTransactions: 'Cantidad transacciones',
  totalMoney: 'Valor',
};

export class SegmentAffiliatedKipon {
  [ID_DATA_NAME]?: number;
  store_id: string = '';
  membership: string = '';
  cust_id: string = '';
  first_name: string = '';
  second_name: string = '';
  surname: string = '';
  lastname: string = '';
  home_phone: string = '';
  cel_phone: string = '';
  business_phone: string = '';
  email: string = '';
  birthday: string = '';
  gender: string = '';
  status: string = '';
  signup_date: string = '';
}

export const segmentAffiliatedKiponLabels = {
  store_id: 'Tienda',
  membership: 'Numero socio',
  cust_id: 'Id cliente',
  first_name: 'Primer nombre',
  second_name: 'Segundo nombre',
  surname: 'Primer apellido',
  lastname: 'Segundo apellido',
  home_phone: 'Telefono casa',
  cel_phone: 'Telefono celular',
  business_phone: 'Telefono trabajo',
  email: 'Email',
  birthday: 'Fecha nacimiento',
  gender: 'Genero',
  status: 'Estatus',
  signup_date: 'Fecha registro',
};

export class SegmentCollaboratorsNazan {
  [ID_DATA_NAME]?: number;
  store_id: string = '';
  segment: number = 0;
  membership: string = '';
  client_id: string = '';
  first_name: string = '';
  second_name: string = '';
  last_name: string = '';
  second_last_name: string = '';
  cellphone_number: string = '';
  mail: string = '';
  birthday: Date = new Date();
  gender: string = '';
  marital_status: string = '';
  signup_date: Date = new Date();
}

export const segmentCollaboratorsNazanLabels = {
  store_id: 'Tienda',
  segment: 'Segmento',
  membership: 'Numero socio',
  client_id: 'Id cliente',
  first_name: 'Primer nombre',
  second_name: 'Segundo nombre',
  last_name: 'Primer apellido',
  second_last_name: 'Segundo apellido',
  cellphone_number: 'Numero celular',
  mail: 'Email',
  birthday: 'Fecha nacimiento',
  gender: 'Género',
  marital_status: 'Estado civil',
  signup_date: 'Fecha de registro',
};

class ApiErrorDetail {
  path: string = '';
  method: string = '';
  message: string = '';
  timestamp: string = '';
  parameters: object = {};
}

export class ApiErrorResponse {
  code: number = 0;
  name: string = '';
  errors: ApiErrorDetail[] = [];
}

export enum ReportsExcelNames {
  KARDEX_DE_ARTICULO_ = 'KARDEX_DE_ARTICULO_',
  COMPARACION_DE_INVENTARIOS_ = 'COMPARACION_DE_INVENTARIOS_',
  REPORTE_DE_RECEPCION_DE_MERCANCIA_ = 'REPORTE_DE_RECEPCION_DE_MERCANCIA_',
  DIFERENCIA_DE_INVENTARIO_SAP_VS_XSTORE_ = 'DIFERENCIA_DE_INVENTARIO_SAP_VS_XSTORE_',
  EXISTENCIA_DE_INVENTARIO_DETALLE_ = 'EXISTENCIA_DE_INVENTARIO_DETALLE_',
  EXISTENCIA_DE_INVENTARIO_RESUMEN_ = 'EXISTENCIA_DE_INVENTARIO_RESUMEN_',
  REPORTE_DETALLE_MOVIMIENTOS_PUNTO_Y_PREMIOS_ = 'REPORTE_DETALLE_MOVIMIENTOS_PUNTO_Y_PREMIOS_',
  REPORTE_DETALLE_MOVIMIENTOS_MONEDERO_ = 'REPORTE_DETALLE_MOVIMIENTOS_MONEDERO_',
  REPORTE_TOTALES_MOVIMIENTO_PUNTOS_Y_MONEDERO_ = 'REPORTE_TOTALES_MOVIMIENTO_PUNTOS_Y_MONEDERO_',
  INFORME_GENERAL_DE_VENTAS_ = 'INFORME_GENERAL_DE_VENTAS_',
  TOTALES_DE_FACTURACION_ = 'TOTALES_DE_FACTURACION_',
  AFILIADOS_CLUP_KIPON_ = 'AFILIADOS_CLUP_KIPON_',
  SEGMENTOS_COLABORADORES_NAZAN_ = 'SEGMENTOS_COLABORADORES_NAZAN_',
  CUMPLIMIENTO_CONTEOS_CICLICOS_ = 'CUMPLIMIENTO_CONTEOS_CICLICOS_',
  VENTA_DE_MAYOREOS_ = 'VENTA_DE_MAYOREOS_',
  CREDITO_DE_SOCIOS = 'CREDITO_DE_SOCIOS',
  TA_GENERAL = 'TA_GENERAL',
  TA_DETALLE = 'TA_DETALLE',
  CALCULO_PERSONALIZADO = 'PERSONALIZADO',
  CALCULO_PREDETEMRINADO = 'PREDETERMINADO',
}
//${ReportsExcelNames.SEGMENTOS_COLABORADORES_NAZAN_}

export const inventoryUploadLabels = {
  storeId: 'Tienda',
  file: 'Archivo',
  xcenter_qty: 'Cantidad xCenter',
  atg_qty: 'Cantidad ATG',
  orderbroker_qty: 'Cantidad Order-Broker',
};
