
/* ----------------------------------------
----clases para recibir datos de socios----
-----------------------------------------*/
export class CustomerInformationResponse {
  no_socio:number = 0;
  nombre: string | null = null;
  ap_paterno: string | null = null;
  ap_materno: string | null = null;
}

export class AccountInformationResponse {
  no_cuenta: string | null = null;
  estado: string | null = null;
  fecha_configuracion: string | null | undefined = null;
  lim_credito: string | null = null;
  cred_disponible: string | null = null;
  saldo_pendiente: string | null = null;
  cuenta_retenida: string | null = null;
} 

export class AccountAutResponse {
	principal: string | null = null;
	no_cliente: string | null = null;
	nombre: string | null = null;
}

export class TransactionsHistoryResponse{
  fecha_ticket: string | null | undefined= null;
  tienda: string | null = null;
  no_cliente: string | null = null;
  nombre: string | null = null;
  ticket: string | null = null;
  tipo_movimiento: string | null = null;
  monto_a_credito: string | null = null;
  forma_pago?:string | null = null;
  ref_bancaria?: string | null = null;
  ref_ticket?: string | null = null;
  fecha_ref_deposito?: string | null = null;
  total_ticket: string | null = null;
  caja: string | null = null;
}
export class TicketResumeItemResponse{
  Item: string | null = null;
  Articulo: string | null = null;
  Cantidad: string | null = null;
  Precio: string | null = null;
  Importe: string | null = null;
}
export class TicketResumeTndrResponse{
  tndr_id: string | null = null;
  amt: string | null = null;
}
//informacion socio
export const CustomerInformation: any[] = [
  'No. Socio',
  'Nombre'
]

export const AccountInformation: any[] = [
  'Numero de cuenta',
  'Estado',
  'Fecha de Apertura',
  'Límite de Crédito',
  'Crédito Disponible',
  'Saldo Pendiente',
  'Cuenta Retenida'
]

export const membersAut: any [] = [
  'No. cliente',
	'Nombre',
  'Principal'
]
//informacion movimientos
export const TicketInformation: any[] = [
  'Ticket',
  'Fecha Ticket',
  'Total Ticket',
  'Monto a Crédito',
  'Tipo Movimiento',
  'Forma Pago',
  'Referencia Bancaria',
  'Referencia Ticket',
  'Fecha referencia Deposito',
  'Tienda',
  'Caja',
  'No. Cliente',
  'Nombre'  
]

export const TicketResumeItem: any[] = [
  'Item',
	'Articulo',
  'Cantidad',
  'Precio',
  'Importe'
]
export const TicketResumeTndr: any[] = [
  'Forma de pago',
  'Total'
]
