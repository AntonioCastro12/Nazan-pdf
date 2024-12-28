import { Identity } from 'src/app/sso/identity.interface';

export class TemplateState {
  identity!: Identity | null;
  /* Theme */
  currentThemePath: string = 'assets/styles/theme/lara-light-indigo/theme.css';
  /* Sidebar */
  // sidebarActive: boolean = true;
  sidebarMainVisible: boolean = false;
  sidebarOverlayVisible: boolean = false;
  /* Menu */
  menuSelected: any;

  sidebarRol: boolean = false;
  roleList: any;

  currentMenu: any;

  toogleSidebarMainVisible() {
    const sidebarMainVisible = (this.sidebarMainVisible =
      !this.sidebarMainVisible);
    // sessionStorage.setItem('configMenu', JSON.stringify(sidebarMainVisible));
    if (this.sidebarMainVisible) {
      this.sidebarOverlayVisible = false;
    }
    //console.log({ toogleSidebarMainVisible: this.sidebarMainVisible });
  }

  toogleSidebarOverlayVisible() {
    const sidebarOverlayVisible = (this.sidebarOverlayVisible =
      !this.sidebarOverlayVisible);
    if (this.sidebarOverlayVisible) {
      this.sidebarMainVisible = false;
    }
    // sessionStorage.setItem('configMenu', JSON.stringify(sidebarOverlayVisible));
    //console.log({ toogleSidebarOverlayVisible: this.sidebarOverlayVisible });
  }
}
