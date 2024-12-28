export class InventoryCycleCountResponse {
  rtl_loc_id: number | null = null;
  ID_CONTEO: string | null = null;
  TIPO_CONTEO: string | null = null;
  MARCA: string | null = null;
  FECHA_INICIAL: string | null = null;
  FECHA_FINAL: string | null = null;
  count_status: string | null = null;
  CANT_ITEMS: number | null = null;
}

export const inventoryCycleCountResponseName = {
  rtl_loc_id: 'Id tienda',
  ID_CONTEO: 'Id conteo',
  TIPO_CONTEO: 'Tipo conteo',
  MARCA: 'Marca',
  FECHA_INICIAL: 'Fecha inicial',
  FECHA_FINAL: 'Fecha final',
  count_status: 'Estado del conteo',
  CANT_ITEMS: 'Cantidad items',
};
