export const sistemasMenu = [
  {
    label: ' BIENVENIDA',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Inicio',
        routerLink: ['/layout/home'],
      },
    ],
  },
  {
    label: 'Operaciones',
    icon: 'pi pi-fw pi-truck',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Inventarios',

        items: [
          {
            label: 'Kardex de artículo',

            routerLink: ['inventory-kardex'],
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
        label: 'Crédito de Socios',

        routerLink: ['credito-socios'],
      },
      {
        label: 'Tiempo Aire',
        items: [
          {
            label: 'Reporte General Recargas TA',

            routerLink: ['tiempo-aire-gral'],
          },
          {
            label: 'Reporte Detalle Recargas TA',

            routerLink: ['tiempo-aire-detalle'],
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
      {
        label: 'Ventas',
        items: [
          {
            label: 'Venta de Mayoreos',
            routerLink: ['sales-wholesale'],
          },
          {
            label: 'Dashboard de órdenes',
            routerLink: ['orders-dashboard'],
          },
          {
            label: 'Reporte de Productos de Busqueda APP entregados',
            routerLink: ['sales-search-delivered'],
          },
        ],
      },
    ],
  },
  {
    label: 'MARKETING',
    icon: 'pi pi-fw pi-megaphone',
    expanded: true,
    disabled: true,
    items: [
      {
        label: 'Club impuls Premia',

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
      {
        label:'Catálogos Digitales',
        items:[
        {
          label:'Calculadora de Incrementos',
          routerLink: ['calc-incremento'],
        },
        {
          label:'Catálogos PDF Preciado',
          routerLink: ['pdf-preciado'],
        },
        {
          label:'Plantillas PDF',
          routerLink: ['app-plantillas-pdf'],
        }

        ]
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
    label: 'ADMINISTRACIÓN Y FINANZAS',
    icon: 'pi pi-fw pi-money-bill',
    expanded: true,
    disabled: true,
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
    ],
  },
  {
    label: 'PLANEACIÓN Y COMPRAS',
    icon: 'pi pi-fw pi-list',
    expanded: true,
    disabled: true,
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
