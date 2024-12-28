export const staffMayoreoMenu = [
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
    label: 'Operaciones',
    icon: 'pi pi-fw pi-truck',
    items: [
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de artículo',

            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
          {
            label: 'Cumplimiento de Conteo',

            routerLink: ['/layout/reports/inventories/cycle-count'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',

            routerLink: ['/layout/reports/inventories/sap-xstore'],
          },
        ],
      },
      {
        label: 'Segmentos',

        items: [
          {
            label: 'Colaboradores Nazan',

            routerLink: ['/layout/reports/segments/collaborators-nazan'],
          },
        ],
      },
    ],
  },
];
