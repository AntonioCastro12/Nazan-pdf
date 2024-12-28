import { Injectable } from '@angular/core';

// vendor
import { BehaviorSubject } from 'rxjs';
import { LayoutState, Roles } from '../models/layout.state';
import { AuthStateService } from 'src/app/layout/modules/auth-manager/services/auth-state.service';
import { tiendaMenu } from '../menus/tienda-menu';
import { staffMenudeoMenu } from '../menus/staff-menudeo-menu';
import { staffKiponMenu } from '../menus/staff-kipon-menu';
import { staffMayoreoMenu } from '../menus/staff-mayoreo-menu';
import { staffIngresosMenu } from '../menus/staff-ingresos-menu';
import { staffInventariosOSTMenu } from '../menus/staff-inventariosOST-menu';
import { staffMarketingMenu } from '../menus/staff-marketing-menu';
import { staffPlaneacionMenu } from '../menus/staff-planeacion-menu';
import { welcomeMenu } from '../menus';

/************************************************* */

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  private subject = new BehaviorSubject<LayoutState>(new LayoutState());
  state = this.subject.asObservable();

  layoutState = new LayoutState();

  constructor(private _authStateService: AuthStateService) {
    this.state.subscribe((state) => (this.layoutState = state));
    this.setSidebar();
  }

  setSidebar() {
    let menu: any = [];
    const privileges =
      this._authStateService.stateTemp.userInfo.privileges
        .reportesadministrativos;

    for (const value of Object.values(Roles)) {
      if (privileges.find((item) => item === value)) {
        menu =
          privileges.length > 1
            ? this.unifyMenus(menu, this.getMenu(value))
            : this.getMenu(value);
      }
    }
    this.layoutState.config.menuSelected = menu;
    this.subject.next(this.layoutState);
  }

  getMenu(value: string) {
    let menu: any = [];
    switch (value) {
      case Roles.TIENDA:
        menu = tiendaMenu;
        break;
      case Roles.STAFF_KIPON:
        menu = staffKiponMenu;
        break;
      case Roles.STAFF_MAYOREO:
        menu = staffMayoreoMenu;
        break;
      case Roles.STAFF_MENUDEO:
        menu = staffMenudeoMenu;
        break;
      case Roles.STAFF_INGRESOS:
        menu = staffIngresosMenu;
        break;
      case Roles.STAFF_INVENTARIO_OST:
        menu = staffInventariosOSTMenu;
        break;
      case Roles.STAFF_MARKETING:
        menu = staffMarketingMenu;
        break;
      case Roles.STAFF_PLANEACION:
        menu = staffPlaneacionMenu;
        break;
      case Roles.SISTEMAS:
        menu = welcomeMenu;
        break;
    }
    return menu;
  }

  unifyMenus(menus1: any[], menus2: any[]): any[] {
    const combinedMenus = menus1.concat(menus2);
    const groupedMenus = combinedMenus.reduce((accumulator, item) => {
      const existingMenu = accumulator.find(
        (menu: any) => menu.label === item.label
      );
      if (existingMenu) {
        existingMenu.items.push(
          ...item.items.filter(
            (newItem: any) =>
              !existingMenu.items.some(
                (oldItem: any) => oldItem.label === newItem.label
              )
          )
        );
      } else {
        accumulator.push({
          label: item.label,
          icon: item.icon,
          items: item.items,
        });
      }
      return accumulator;
    }, []);

    groupedMenus.forEach((menu: any) => {
      menu.items.sort((a: any, b: any) => {
        return a.label.localeCompare(b.label);
      });
    });

    groupedMenus.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label);
    });

    groupedMenus.sort((a: any, b: any) => {
      if (a.label === 'Bienvenida') {
        return -1;
      } else if (b.label === 'Bienvenida') {
        return 1;
      } else {
        return 0;
      }
    });

    groupedMenus.sort((a: any, b: any) => {
      if (a.label === 'Salir') {
        return 1;
      } else if (b.label === 'Salir') {
        return -1;
      } else {
        return 0;
      }
    });

    return groupedMenus;
  }
}
