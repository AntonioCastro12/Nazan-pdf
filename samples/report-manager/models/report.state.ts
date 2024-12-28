import { InventoryStockDetail, ReportList } from "./report.entity";

class BasicObjectState {
  original: ReportList = { total: 0, data: [] };
  list: ReportList = { total: 0, data: [] };
  filter: ReportList = { total: 0, data: [] };
}
class InventoryStockResume extends BasicObjectState {
  details: InventoryStockDetail[] = [];
}

class SalesChart extends BasicObjectState {
  chart: any[] = [];
}

export class ReportState {
  inventory: {
    kardex: BasicObjectState
    stockResume: InventoryStockResume,
    comparison: BasicObjectState,
    pod: BasicObjectState,
    sapXstore: BasicObjectState,
    cycleCount: BasicObjectState,
  } = {
      kardex: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      stockResume: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
        details: []
      },
      comparison: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      pod: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      sapXstore: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      },
      cycleCount: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
      }
    };
  pointProgram: {
    detailPoints: BasicObjectState
    detailWallet: BasicObjectState
    totalMovement: BasicObjectState
  } = {
      totalMovement: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailPoints: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      detailWallet: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };
  sales: {
    invoiceTotal: SalesChart,
    generalSales: BasicObjectState
    wholesale: BasicObjectState
  } = {
      invoiceTotal: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] },
        chart: []
      },
      generalSales: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      wholesale: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };
  segments: {
    affiliatedKipon: BasicObjectState,
    collaboratorsNazan: BasicObjectState,
  } = {
      affiliatedKipon: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
      collaboratorsNazan: {
        original: { total: 0, data: [] },
        list: { total: 0, data: [] },
        filter: { total: 0, data: [] }
      },
    };

}
