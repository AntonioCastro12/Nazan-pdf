export const staffMarketingMenu = [
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
    label: 'Marketing',
    icon: 'pi pi-fw pi-megaphone',
    items: [
      {
        label: 'Club impuls Premia',

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
        ]
      },
    ],
  },
];
