export class InventoryComparisonResponse {
  productId: string | null = null;
  storeId: string | null = null;
  xstore_qty: string | null = null;
  xcenter_qty: string | null = null;
  atg_qty: string | null = null;
  orderbroker_qty: string | null = null;
}

export const inventoryComparisonResponseName = {
  productId: '',
  storeId: 'Tienda',
  xstore_qty: 'Cantidad de xStore',
  xcenter_qty: 'Cantidad de xCenter',
  atg_qty: 'atg_qty',
  orderbroker_qty: 'orderbroker_qty',
};
