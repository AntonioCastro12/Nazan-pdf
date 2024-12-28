export const staffPlaneacionMenu = [
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
    expanded: true,
    disabled: true,
    items: [
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
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
