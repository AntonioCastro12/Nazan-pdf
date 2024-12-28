export class SalesGeneralSalesResponse {
  titleLine: string | null = null;
  countTransactions: number | null = null;
  totalMoney: number | null = null;
  translation?: string | null = null;
}

export const salesGeneralSalesResponseName = {
  titleLine: 'Texto',
  countTransactions: 'Cantidad transacciones',
  totalMoney: 'Valor',
};

export class SalesGeneralPaymentResponse {
  titleLine: string | null = null;
  countTransactions: number | null = null;
  totalMoney: number | null = null;
  translation: string | null = null;
}

export const SalesGeneralPaymentResponseName = {
  titleLine: 'Texto',
  countTransactions: 'Cantidad transacciones',
  totalMoney: 'Valor',
  translation: 'Traducción',
};
