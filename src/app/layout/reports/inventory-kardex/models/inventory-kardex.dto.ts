export class KardexProductDTO {
  storeId: string = '';
  productId: string = '';
  origin: 'xcenter' | 'xstore' = 'xcenter';
  startDate: string = '';
  endDate: string = '';
}

export const kardexProductDTOname = {
  storeId: 'Tienda',
  productId: 'Código de producto',
  origin: 'Origen',
  startDate: 'Desde',
  endDate: 'Hasta',
};
