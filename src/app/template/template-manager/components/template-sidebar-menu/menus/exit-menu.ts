export const exitMenu = {
  label: 'Salir',
  icon: 'pi pi-sign-out',
  command: () => {
    goMap();
  },
};

function goMap() {
  window.location.href = 'https://dashboard.impuls.com.mx/';
}
