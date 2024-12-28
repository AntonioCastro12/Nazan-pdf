export const welcomeMenu = [
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    routerLink: ['/layout/home'],
  },
  // {
  //   label: 'Bienvenida',
  //   items: [
  //     {
  //       label: 'Inicio',
  //       icon: 'pi pi-fw pi-home',
  //       routerLink: ['/layout/home'],
  //     },
  //   ],
  // },
  {
    label: 'Operaciones',
    icon: 'pi pi-fw pi-truck',
    items: [
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de artículo',

            routerLink: ['inventory-kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['inventory-stock-resume'],
          },
          {
            label: 'Cumplimiento de Conteo',

            routerLink: ['inventory-cycle-count'],
          },
          {
            label: 'Diferencia de inventario SAP vs Xstore',

            routerLink: ['inventory-sap-xstore'],
          },
        ],
      },
      {
        label: 'Segmentos',

        items: [
          {
            label: 'Colaboradores Nazan',

            routerLink: ['segment-collaborators-nazan'],
          },
          {
            label: 'Afiliados KIPON SHOE CLUB',

            routerLink: ['segment-affiliated-kipon'],
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

            routerLink: ['point-program-total-movement'],
          },
          {
            label: 'Detalle mov. puntos y monedero',

            routerLink: ['point-program-detail'],
          },
          {
            label: 'Detalle movimientos monedero',

            routerLink: ['point-program-detail-wallet'],
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

            routerLink: ['sales-invoice-total'],
          },
          {
            label: 'Informe general de ventas',

            routerLink: ['sales-general-sales'],
          },
        ],
      },
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de articulo',

            routerLink: ['inventory-kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['inventory-stock-resume'],
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
            routerLink: ['inventory-pod'],
          },
          {
            label: 'Existencia de inventario',
            routerLink: ['inventory-stock-resume'],
          },
        ],
      },
      {
        label: 'Articulos Similares',

        items: [
          {
            label: 'Carga de archivo para Surtidores',
            routerLink: ['inventory-upload'],
          },
        ],
      },
    ],
  },
];

function goMap() {
  localStorage.clear();
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
