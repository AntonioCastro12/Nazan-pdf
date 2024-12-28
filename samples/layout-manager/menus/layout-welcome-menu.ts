export const welcomeMenu = [
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
          {
            label: 'Afiliados KIPON SHOE CLUB',

            routerLink: ['/layout/reports/segments/affiliated-kipon'],
          },
        ],
      },
    ],
  },
  {
    label: 'Marketing',
    icon: 'pi pi-fw pi-megaphone',
    items: [
      {
        label: 'Club impuls Premia',
        icon: 'pi pi-fw pi-bullhorn',
        items: [
          {
            label: 'General mov. puntos y monedero',

            routerLink: ['/layout/reports/point-program/total-movement'],
          },
          {
            label: 'Detalle mov. puntos y monedero',

            routerLink: ['/layout/reports/point-program/detail-points'],
          },
          {
            label: 'Detalle movimientos monedero',

            routerLink: ['/layout/reports/point-program/detail-wallet'],
          },
        ],
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
            label: 'Totales de facturación',

            routerLink: ['/layout/reports/sales/invoice-total'],
          },
          {
            label: 'Informe general de ventas',

            routerLink: ['/layout/reports/sales/general-sales'],
          },
        ],
      },
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de articulo',

            routerLink: ['/layout/reports/inventories/kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ],
      },
    ],
  },
  {
    label: 'Planeación y Compras',
    icon: 'pi pi-fw pi-list',
    items: [
      {
        label: 'Inventario',

        items: [
          {
            label: 'Reporte de recepción de mercancía (POD)',
            routerLink: ['/layout/reports/inventories/pod'],
          },
          {
            label: 'Existencia de inventario',
            icon: 'pi pi›-fw pi-minus',
            routerLink: ['/layout/reports/inventories/inventory-stock/resume'],
          },
        ],
      },
    ],
  },
  {
    label: 'Salir',
    items: [
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        routerLink: ['/layout/welcome/logout'],
      },
    ],
  },
];
