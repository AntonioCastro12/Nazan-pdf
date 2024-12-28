export const tiendaMenuMenudeo = [
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

            routerLink: ['inventory-kardex'],
          },
          {
            label: 'Existencia de inventario',

            routerLink: ['inventory-stock-resume'],
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
        ],
      },
    ],
  },
];

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
