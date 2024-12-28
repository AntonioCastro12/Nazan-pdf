import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LuxonModule } from 'luxon-angular';

import { LayoutManagerRoutingModule } from 'src/app/layout/config/layout-manager/layout-manager-routing.module';
import { LayoutManagerComponent } from 'src/app/layout/config/layout-manager/layout-manager.component';

import { LayoutManagerTopbarComponent } from 'src/app/layout/config/layout-manager/common/layout-manager-topbar/layout-manager-topbar.component';
import { LayoutManagerSidebarComponent } from 'src/app/layout/config/layout-manager/common/layout-manager-sidebar/layout-manager-sidebar.component';
import { LayoutManagerMenuComponent } from 'src/app/layout/config/layout-manager/common/layout-manager-menu/layout-manager-menu.component';

import { AppMenuitemComponent } from 'src/app/layout/config/layout-manager/common/layout-manager-menu/app.menuitem.component';
import { LayoutConfigComponent } from 'src/app/layout/config/layout-manager/common/layout-config/layout.config.component';

import { LayoutFrameComponent } from 'src/app/layout/config/layout-manager/pages/layout-frame/layout-frame.component';
import { LayoutFilterDarkThemePipe } from './pipes/layout-filter-dark-theme.pipe';
import { LayoutFilterLightThemePipe } from './pipes/layout-filter-light-theme.pipe';
import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { AuthStateService } from '../../modules/auth-manager/services/auth-state.service';
import { AuthManagerModule } from '../../modules/auth-manager/auth-manager.module';

@NgModule({
  declarations: [
    LayoutManagerTopbarComponent,
    LayoutManagerSidebarComponent,
    LayoutFrameComponent,
    LayoutManagerMenuComponent,
    AppMenuitemComponent,
    LayoutManagerComponent,
    LayoutConfigComponent,
    LayoutFilterDarkThemePipe,
    LayoutFilterLightThemePipe,
  ],
  imports: [
    CommonModule,
    LayoutManagerRoutingModule,
    PrimeNgModule,
    LuxonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthManagerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutManagerModule { }
