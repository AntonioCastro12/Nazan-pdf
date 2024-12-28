import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  LayoutManagerSidebarComponent,
  LayoutManagerTopbarComponent,
} from 'src/app/layout/config/layout-manager/common';
import { LayoutService } from 'src/app/layout/config/layout-manager/services';
import { LayoutStateService } from 'src/app/layout/config/layout-manager/services/layout.state.service';

@Component({
  selector: 'layout-frame',
  templateUrl: './layout-frame.component.html',
  styleUrls: ['./layout-frame.component.scss'],
})
export class LayoutFrameComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(LayoutManagerSidebarComponent)
  appSidebar!: LayoutManagerSidebarComponent;

  @ViewChild(LayoutManagerTopbarComponent)
  appTopbar!: LayoutManagerTopbarComponent;

  layoutState;
  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    private layoutStateService: LayoutStateService
  ) {
    this.layoutState = this.layoutStateService.layoutState;
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                // ||
                // this.appTopbar.menuButton.nativeElement.isSameNode(
                //   event.target
                // )
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );

              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (!this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
                this.appTopbar.menu.nativeElement.contains(event.target) ||
                this.appTopbar.topbarMenuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.topbarMenuButton.nativeElement.contains(
                  event.target
                )
              );

              if (isOutsideClicked) {
                this.hideProfileMenu();
              }
            }
          );
        }

        if (this.layoutState.config.layoutConfig.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }

  hideMenu() {
    this.layoutState.config.layoutConfig.overlayMenuActive = false;
    this.layoutState.config.layoutConfig.staticMenuMobileActive = false;
    this.layoutState.config.layoutConfig.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutState.config.layoutConfig.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-theme-light':
        this.layoutState.config.themeConfig.colorScheme === 'light',
      'layout-theme-dark':
        this.layoutState.config.themeConfig.colorScheme === 'dark',

      'layout-overlay':
        this.layoutState.config.appConfig.menuMode === 'overlay',
      'layout-static': this.layoutState.config.appConfig.menuMode === 'static',

      'layout-static-inactive':
        this.layoutState.config.layoutConfig.staticMenuDesktopInactive &&
        this.layoutState.config.appConfig.menuMode === 'static',

      'layout-overlay-active':
        this.layoutState.config.layoutConfig.overlayMenuActive,

      'layout-mobile-active':
        this.layoutState.config.layoutConfig.staticMenuMobileActive,

      'p-input-filled':
        this.layoutState.config.appConfig.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutState.config.appConfig.ripple,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
