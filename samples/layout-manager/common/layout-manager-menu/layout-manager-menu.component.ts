import { Component, OnInit } from '@angular/core';
import { welcomeMenu } from 'src/app/layout/config/layout-manager/menus';
import { LayoutService, LayoutStateService } from '../../services';
import { AuthStateService } from 'src/app/layout/modules/auth-manager/services/auth-state.service';

@Component({
  selector: 'layout-manager-menu',
  templateUrl: './layout-manager-menu.component.html',
  styleUrls: ['./layout-manager-menu.component.scss'],
})
export class LayoutManagerMenuComponent implements OnInit {
  model: any[] = welcomeMenu;

  layoutState;
  // authState;
  constructor(
    public layoutService: LayoutService,
    public layoutStateService: LayoutStateService,
    private auth: AuthStateService
  ) {
    this.layoutState = this.layoutStateService.layoutState;
    // this.authState = this.auth.authState
    this.layoutStateService.setSidebar();
  }
  ngOnInit() {}
}
