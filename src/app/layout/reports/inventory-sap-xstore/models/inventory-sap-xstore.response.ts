export class InventorySapXstoreResponse {
  store_id: number | null = null;
  material: string | null = null;
  year: number | null = null;
  sap: number | null = null;
  xstore: number | null = null;
  difference: number | null = null;
  abs: number | null = null;
}

export const inventorySapXstoreResponseName = {
  store_id: 'Tienda',
  material: 'Material',
  year: 'Año',
  sap: 'Sap',
  xstore: 'Xstore',
  difference: 'Diferencia',
  abs: 'ABS',
};
