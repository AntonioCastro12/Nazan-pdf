export class InventoryComparisonDTO {
  storeId: string = '';
  productId: string = '';
  xstore_qty: string = '';
  xcenter_qty: string = '';
  atg_qty: string = '';
  orderbroker_qty: string = '';
}

export const inventoryComparisonLabels = {
  storeId: 'Tienda',
  productId: 'Producto',
  xstore_qty: 'Cantidad xStore',
  xcenter_qty: 'Cantidad xCenter',
  atg_qty: 'Cantidad ATG',
  orderbroker_qty: 'Cantidad Order-Broker',
};
