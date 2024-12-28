export class InventoryStockResumeResponse {
  store_id: number = 0;
  line: string | null = null;
  qty: number | null = null;
}

export const inventoryStockResumeResponseName = {
  store_id: 'Tienda',
  line: 'Linea',
  qty: 'Cantidad',
};

export class InventoryStockDetailResponse {
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
}

export const InventoryStockDetailResponseName = {
  storeId: 'Tienda',
  itemId: 'Articulo',
  sku: 'Sku',
  description: 'Descripción',
  department: 'Departamento',
  line: 'Línea',
  family: 'Familia',
  subFamily: 'Sub_Familia',
  size: 'Talla',
  block: 'Bloque',
  qty: 'Cantidad',
  createDate: 'Fecha',
};
