export class SalesInvoiceTotalResponse {
  storeId: string | null = null;
  businessDate: string | null = null;
  saleTypeSale: string | null = null;
  totalMoneySale: number | null = null;
  totalUnitSale: number | null = null;
  countInvoiceSale: number | null = null;
  saleTypeReturn: string | null = null;
  totalMoneyReturn: number | null = null;
  totalUnitReturn: number | null = null;
  countInvoiceReturn: number | null = null;
  unitPercentReturn: number | null = null;
  totalPercentReturn: number | null = null;
  saleTypeFreight: string | null = null;
  totalMoneyFreight: number | null = null;
  totalUnitFreight: number | null = null;
  countInvoiceFreight: number | null = null;
}

export const salesInvoiceTotalResponseName = {
  storeId: 'Tienda',
  businessDate: 'Fecha',
  saleTypeSale: 'Tipo de venta',
  totalMoneySale: '$ Ventas ',
  totalUnitSale: 'Ventas unidades',
  countInvoiceSale: 'Cantidad facturas',
  saleTypeReturn: 'Tipo de devolución',
  totalMoneyReturn: '$ Devoluciones',
  totalUnitReturn: 'Devoluciones unidades',
  countInvoiceReturn: 'Cantidad devolución de factura',
  unitPercentReturn: 'Devolución unidad Porcentaje',
  totalPercentReturn: 'Promedio devoluciones',
  saleTypeFreight: 'Tipo de carga de la venta',
  totalMoneyFreight: '$ Flete',
  totalUnitFreight: 'Carga unitaria total',
  countInvoiceFreight: 'Cantidad fletes ',
};
