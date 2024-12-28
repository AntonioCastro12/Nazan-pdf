export const staffIngresosMenu = [
  {
    label: 'Bienvenida',
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/layout/home'],
      },
    ],
  },
  {
    label: 'Administración y Finanzas',
    icon: 'pi pi-fw pi-money-bill',
    items: [
      {
        label: 'Ventas',

        items: [
          {
            label: 'Informe general de ventas',

            routerLink: ['/layout/reports/sales/general-sales'],
          },
          {
            label: 'Venta de Mayoreos',

            routerLink: ['/layout/reports/sales/wholesale-sales'],
          },
        ]
      },
      {
        label: 'Inventarios',
        items: [
          {
            label: 'Existencia de inventario',
            icon: 'pi pi›-fw pi-minus',
            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ]
      },
    ],
  },
];
