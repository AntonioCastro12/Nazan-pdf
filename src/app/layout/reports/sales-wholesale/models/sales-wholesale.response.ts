export class SalesWholesaleResponse {
  Tienda: number | null = null;
  Fecha: string | null = null;
  Num_Colaborador: string | null = null;
  Colaborador: string | null = null;
  Transacciones_Totales: number | null = null;
  Total_Pares: number | null = null;
  Transacciones_1_Par: number | null = null;
  Transacciones_2_Par: number | null = null;
  Transacciones_3_o_Mas_Par: number | null = null;
  Mayoreos: number | null = null;
}

export const salesWholesaleResponseName = {
  Tienda: 'Tienda',
  Fecha: 'Fecha',
  Num_Colaborador: 'Num Colaborador',
  Colaborador: 'Colaborador',
  Transacciones_Totales: 'Transacciones totales',
  Total_Pares: 'Total pares',
  Transacciones_1_Par: 'Transacciones 1 par',
  Transacciones_2_Par: 'Transacciones 2 par',
  Transacciones_3_o_Mas_Par: 'Transacciones 3 o mas par',
  Mayoreos: 'Mayoreos',
};
