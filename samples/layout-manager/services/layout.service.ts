import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutStateService } from './layout.state.service';
import { LayoutConfig } from '../models/layout.config';
import { AppConfig } from '../models/app.config';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  config: AppConfig = new AppConfig();

  state: LayoutConfig = new LayoutConfig();

  private configUpdate = new Subject<AppConfig>();

  private overlayOpen = new Subject<any>();

  configUpdate$ = this.configUpdate.asObservable();

  overlayOpen$ = this.overlayOpen.asObservable();

  layoutState;
  constructor(private layoutStateService: LayoutStateService) {
    this.layoutState = this.layoutStateService.layoutState;
  }

  onOpenSidebar() {
    this.layoutState.config.layoutConfig.sidebarActive =
      !this.layoutState.config.layoutConfig.sidebarActive;
  }
  onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.config.layoutConfig.overlayMenuActive =
        !this.layoutState.config.layoutConfig.overlayMenuActive;
      if (this.layoutState.config.layoutConfig.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.layoutState.config.layoutConfig.staticMenuDesktopInactive =
        !this.layoutState.config.layoutConfig.staticMenuDesktopInactive;
    } else {
      this.layoutState.config.layoutConfig.staticMenuMobileActive =
        !this.layoutState.config.layoutConfig.staticMenuMobileActive;

      if (this.layoutState.config.layoutConfig.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  showProfileSidebar() {
    this.layoutState.config.layoutConfig.profileSidebarVisible =
      !this.layoutState.config.layoutConfig.profileSidebarVisible;
    if (this.layoutState.config.layoutConfig.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  showConfigSidebar() {
    this.layoutState.config.layoutConfig.configSidebarVisible = true;
  }

  isOverlay() {
    return this.layoutState.config.appConfig.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onConfigUpdate() {
    this.configUpdate.next(this.layoutState.config.appConfig);
  }
}
