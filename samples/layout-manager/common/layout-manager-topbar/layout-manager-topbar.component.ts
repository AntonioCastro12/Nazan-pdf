import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutStateService } from 'src/app/layout/config/layout-manager/services/layout.state.service';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services';

import { DateTime } from 'luxon';
import { concatMap, of, repeat, tap, timer } from 'rxjs';
import { AuthStateService } from 'src/app/layout/modules/auth-manager/services/auth-state.service';

@Component({
  selector: 'layout-manager-topbar',
  templateUrl: './layout-manager-topbar.component.html',
  styleUrls: ['./layout-manager-topbar.component.scss'],
})
export class LayoutManagerTopbarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  time: DateTime = DateTime.now();

  isConfigVisible = false;

  layoutState;
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private layoutStateService: LayoutStateService,
    public authStateService: AuthStateService
  ) {
    this.layoutState = this.layoutStateService.layoutState;
  }

  ngOnInit(): void {
    this.layoutState.config.layoutConfig.configSidebarVisible = true;
    this.getCurrentDate();
  }

  onConfig() {
    this.layoutState.config.layoutConfig.configSidebarVisible =
      !this.layoutState.config.layoutConfig.configSidebarVisible;
  }

  goStartPage() {
    this.router.navigate(['/']);
  }

  getCurrentDate() {
    let each_interval = 1000;

    let myRepeat = of(null)
      .pipe(
        concatMap(() => timer(each_interval)),
        tap(() => {}),
        repeat() // optionally .repeat(10)
      )
      .subscribe();

    // let myRepeat = DateTime.now().setZone(
    //   this.welcomeStateService.storedState.configEntity.storeSelected.timezone
    // );

    return myRepeat;
  }

  onLogout() {
    this.router.navigate(['/layout/welcome/logout']);
  }
}
