export class SalesSearchDeliveredResponse {
  codigo: string | null = null;
  nombre: string | null = null;
  talla: string | null = null;
  cantidad: number | null = null;
  ordenSurtido: string | null = null;
  listaEmbarque: string | null = null;
  recibido: string | null = null;
  socio: string | null = null;
  fechaRecibido: string | null = null;
  tienda: string | null = null;
  nombreSocio: string | null = null;
  telefono: string | null = null;
  entregado: boolean | null = null;
}

export const SalesSearchDeliveredResponseName = {
  code: 'Código',
  name: 'Nombre',
  size: 'Talla',
  quantity: 'Cantidad',
  orderAssortment: 'Orden Surtido',
  boardinglist: 'Lista de Embarque',
  received: 'Recibido',
  member: 'Socio',
  dateReceived: 'Fecha de Recibido',
  store: 'Tienda',
  memberName: 'Nombre Socio',
  phone: 'Teléfono',
  delivered: 'Entregado',
};
