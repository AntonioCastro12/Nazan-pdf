import { identifierName } from '@angular/compiler';

export class InventoryStockResumeDTO {
  storeId: string = '';
}
export class creditoSocioDTO {
  memberId: string = '';
  startDate: string='';
  endDate: string ='';
}
export class TicketDetailDTO {
  store: number = 0;
  date: string='';
  ticketNumber: number =0;
  cashRegister: number =0;
}

export const inventoryStockResumeLabels = {
  storeId: 'Tienda',
};
