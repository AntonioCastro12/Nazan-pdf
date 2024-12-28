export class OrdersDashboardResponse {
  tienda: any;
  totalsByStatus: OrderByStatus[] = [];
  totalsByStatusFinal = 0;
  porAntiguedad: OrderByAge = new OrderByAge();
  anteriores: OrderDashboardRecord[] = [];
  unMes: OrderDashboardRecord[] = [];
  ultimaSemana: OrderDashboardRecord[] = [];
  totalsByRange: OrderDashboardTotalsByRange =
    new OrderDashboardTotalsByRange();
  before: OrderDashboardBefore[] = [];
  week: OrderDashboardBefore[] = [];
  month: OrderDashboardBefore[] = [];
}

class OrderByStatus {
  order_status: any;
  qty: any;
}

class OrderByAge {
  tienda: any;
  ultimaSemana: any;
  unMes: any;
  anteriores: any;
}

class OrderDashboardRecord {
  tienda: any;
  orden: any;
  fechaOrden: any;
  statusOrden: any;
  item: any;
  descripcion: any;
  cantidad: any;
  statusItem: any;
  diasEspera: any;
}

class OrderDashboardTotalsByRange {
  week: number = 0;
  before: number = 0;
  month: number = 0;
}

class OrderDashboardBefore {
  Tienda: number = 0;
  Order_Id: string = '';
  Order_Date: string = '';
  Order_Status: string = '';
  item_id: string = '';
  Description: string = '';
  Order_Quantity: number = 0;
  Item_Status: string = '';
  dias_espera: string = '';
}
