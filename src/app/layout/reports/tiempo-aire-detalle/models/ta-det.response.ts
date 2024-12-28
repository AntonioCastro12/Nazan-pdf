export class airTimeDetailResonpse {
  rtl_loc_id: number = 0;
  business_date: null | string | undefined= null;
  wkstn_id: number = 0;
  trans_seq: number = 0;
  quantity: number = 0;
  item_id: null | string = null;
  item_desc: null | string = null;
  total: null | string = null;
  employee_id: number = 0;
  name: null | string = null;
}

export const TaDetResume: any[] = [
  'Tienda',
  'Fecha',
  'Caja',
  'Ticket',
  'Cantidad',
  'Ítem id',
  'Descripción',
  'Total',
  'Id empleado',
  'Nombre de empleado'
]