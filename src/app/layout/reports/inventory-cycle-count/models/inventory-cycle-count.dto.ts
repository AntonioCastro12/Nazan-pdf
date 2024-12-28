export class InventoryCycleCountDTO {
  storeId: string = '';
  startDate: string = '';
  endDate: string = '';
  type: string = '';
}

export const inventoryCycleCountLabels = {
  storeId: 'Tienda',
  startDate: 'Desde',
  endDate: 'Hasta',
  type: 'Tipo de conteo',
};
