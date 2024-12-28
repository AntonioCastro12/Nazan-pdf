export class InventoryPodResponse {
  T_ORIGEN: string | null = null;
  NOMBRE_TDA_ORIGEN: string | null = null;
  T_DESTINO: number | null = null;
  L_EMBARQUE: string | null = null;
  TIPO_EMBARQUE: string | null = null;
  FEC_CREA_SISTEMA: string | null = null;
  FEC_HORA_POD: string | null = null;
  FEC_HORA_CIERRE: string | null = null;
  TIEMPO_HRS: number | null = null;
  ESTATUS: string | null = null;
}

export const inventoryPodResponseName = {
  T_ORIGEN: 'Tienda origen',
  NOMBRE_TDA_ORIGEN: 'Nombre tienda origen',
  T_DESTINO: 'Tienda destino',
  L_EMBARQUE: 'Lista de embarque',
  TIPO_EMBARQUE: 'Tipo embarque',
  FEC_CREA_SISTEMA: 'Fecha creación sistema',
  FEC_HORA_POD: 'Fecha/hora recepción',
  FEC_HORA_CIERRE: 'Fecha/Hora cierre',
  TIEMPO_HRS: 'Tiempo',
  ESTATUS: 'Estatus',
};
