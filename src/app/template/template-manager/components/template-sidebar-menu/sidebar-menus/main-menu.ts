export const mainMenu = [
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    routerLink: '/nav/welcome',
  },
  {
    label: 'OPERACIONES',
    icon: 'pi pi-truck',
    expanded: true,
    items: [
      {
        label: 'Clientes',
        icon: 'pi pi-id-card',
        routerLink: '/nav/client-manager/create',
      },
      {
        label: 'Promotores',
        icon: 'pi pi-users',
        routerLink: '/nav/promoter-manager/list',
        routerLinkActiveOptions: { exact: true },
      },
    ],
  },
  {
    label: 'CONFIGURACIONES',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: '/nav/user-manager/list',
      },
      {
        label: 'Tiendas',
        icon: 'pi pi-shopping-cart',
        routerLink: '/nav/config-manager/list',
      },
    ],
  },
  {
    label: 'Salir',
    icon: 'pi pi-power-off',
    routerLink: '/nav/exit',
  },
];
