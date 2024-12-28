export class KardexProductResponse {
  store_id: number | null = null;
  trans_seq: string | null = null;
  ws_id: string | null = null;
  create_date: string | null = null;
  origin_bucket: string | null = null;
  destiny_bucket: string | null = null;
  action_code: string | null = null;
  item_id: string | null = null;
  description: string | null = null;
  document: string | null = null;
  qty: number | null = null;
  on_hand: number | null = null;
  time_trans: string | null = null;
  on_order: number | null = null;
}

export const KardexProductResponseName = {
  store_id: 'Tienda',
  trans_seq: 'Transacción',
  ws_id: 'Caja',
  create_date: 'Fecha creación',
  origin_bucket: 'Bloque origen',
  destiny_bucket: 'Bloque destino',
  action_code: 'Acción',
  item_id: 'Artículo',
  description: 'Descripción',
  document: 'Documento',
  qty: 'Cantidad',
  on_hand: 'Disponibles',
  time_trans: 'Hora transacción',
  on_order: 'En orden',
};
