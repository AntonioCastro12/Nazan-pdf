import { Injectable } from '@angular/core';
import { TemplateStateService } from './template-state.service';
import { Router } from '@angular/router';
// import { mainMenu } from '../components/template-sidebar-menu/sidebar-menus/main-menu';
import { welcomeMenu } from '../components/template-sidebar-menu/menus';
import { staffIngresosMenu } from '../components/template-sidebar-menu/menus/staff-ingresos-menu';
import { staffInventariosOSTMenu } from '../components/template-sidebar-menu/menus/staff-inventariosOST-menu';
import { staffKiponMenu } from '../components/template-sidebar-menu/menus/staff-kipon-menu';
import { staffMarketingMenu } from '../components/template-sidebar-menu/menus/staff-marketing-menu';
import { staffMayoreoMenu } from '../components/template-sidebar-menu/menus/staff-mayoreo-menu';
import { staffMenudeoMenu } from '../components/template-sidebar-menu/menus/staff-menudeo-menu';
import { staffPlaneacionMenu } from '../components/template-sidebar-menu/menus/staff-planeacion-menu';
import { sistemasMenu } from '../components/template-sidebar-menu/menus/sistemas-menu';
import { exitMenu } from '../components/template-sidebar-menu/menus/exit-menu';
import { UserStateService } from '@user-manager/services';
import { tiendaMenuMenudeo } from '../components/template-sidebar-menu/menus/tienda-menu-menudeo';
import { tiendaMenuMayoreo } from '../components/template-sidebar-menu/menus/tienda-menu mayoreo';

@Injectable({
  providedIn: 'root',
})
export class TemplateActionService {
  moduleActive: string = '';
  mainMenu: any = '';
  welcomeMenu = welcomeMenu;
  staffIngresosMenu = staffIngresosMenu;
  staffInventariosOSTMenu = staffInventariosOSTMenu;
  staffKiponMenu = staffKiponMenu;
  staffMarketingMenu = staffMarketingMenu;
  staffMayoreoMenu = staffMayoreoMenu;
  staffMenudeoMenu = staffMenudeoMenu;
  staffPlaneacionMenu = staffPlaneacionMenu;
  tiendaMenuMenudeo = tiendaMenuMenudeo;
  tiendaMenuMayoreo = tiendaMenuMayoreo;
  sistemasMenu = sistemasMenu;
  exitMenu = exitMenu;
  constructor(
    private _template: TemplateStateService,
    private router: Router,
    private _user: UserStateService
  ) {
    const routeParts = this.router.url.split('/');
    const section = routeParts[2];
    this.moduleActive = section;
    //console.log(section);
  }

  onOpenSidebar() {
    this._template.state.sidebarMainVisible = true;
  }

  onCloseSidebar() {
    this._template.state.sidebarMainVisible = false;
  }

  onMenu(rol: string) {
    if (rol == 'staff-ingresos') {
      let menu: any = staffIngresosMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffIngresosMenu;
    } else if (rol == 'staff-inventarios-ost') {
      let menu: any = staffInventariosOSTMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffInventariosOSTMenu;
    } else if (rol == 'staff-kipon') {
      let menu: any = staffKiponMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffKiponMenu;
    } else if (rol == 'staff-marketing') {
      let menu: any = staffMarketingMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffMarketingMenu;
    } else if (rol == 'staff-mayoreo') {
      let menu: any = staffMayoreoMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffMayoreoMenu;
    } else if (rol == 'staff-menudeo') {
      let menu: any = staffMenudeoMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffMenudeoMenu;
    } else if (rol == 'staff-planeacion') {
      let menu: any = staffPlaneacionMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = staffPlaneacionMenu;
    } else if (
      rol == 'tienda' &&
      this._user.state.userSelected.tiendaTipo === 'menudeo'
    ) {
      let menu: any = tiendaMenuMenudeo;
      menu.push(exitMenu);
      this._template.state.currentMenu = tiendaMenuMenudeo;
    } else if (
      rol == 'tienda' &&
      this._user.state.userSelected.tiendaTipo === 'mayoreo'
    ) {
      let menu: any = tiendaMenuMayoreo;
      menu.push(exitMenu);
      this._template.state.currentMenu = tiendaMenuMayoreo;
    } else if (rol == 'sistemas') {
      let menu: any = sistemasMenu;
      menu.push(exitMenu);
      this._template.state.currentMenu = menu;
    } else {
      let menu: any = [];
      menu.push(exitMenu);
      this._template.state.currentMenu = menu;
    }
    sessionStorage.setItem(
      'currentMenu',
      JSON.stringify(this._template.state.currentMenu)
    );
    // No se usan admin, operaciones, marketing, admin_finanzas, plan_compras,
  }

  goStartPage() {
    this.router.navigate(['/']);
  }

  goExitPage() {
    this.router.navigate(['/exit']);
  }

  onCheckAccess() {
    let token = sessionStorage.getItem('access_token');
    if (token == null) {
      this.goExitPage();
    }
  }
}
