import { Component, Input } from '@angular/core';

import { ThemeConfig } from 'src/app/layout/config/layout-manager/models/theme.config';

import { LayoutService } from 'src/app/layout/config/layout-manager/services';
import { LayoutStateService } from 'src/app/layout/config/layout-manager/services/layout.state.service';
import { MenuService } from 'src/app/layout/config/layout-manager/services/menu.service';
import { ThemeService } from 'src/app/layout/config/layout-manager/services/theme.service';
import { layoutThemeList } from 'src/app/layout/config/layout-manager/themes/layout-theme.list';

@Component({
  selector: 'layout-config',
  templateUrl: './layout.config.component.html',
  styleUrls: ['./layout.config.component.scss'],
})
export class LayoutConfigComponent {
  @Input() minimal: boolean = false;

  TEMPLATE_TEXT = {
    fontSize: 'Tamaño Letra',
    menuType: 'Tipo de Menu',
    static: 'Estático',
    dynamic: 'Dinámico',
    inputStyle: 'Estilo de entrada',
    outline: 'Delineado',
    filled: 'Relleno',
    ripple: 'Efecto de rizo',
    light: 'Claro',
    dark: 'Oscuro',
  };

  scales: number[] = [12, 13, 14, 15, 16];

  basicThemes = layoutThemeList;

  newTheme = new ThemeConfig();

  layoutState;
  constructor(
    public layoutService: LayoutService,
    public menuService: MenuService,
    private themeService: ThemeService,
    private layoutStateService: LayoutStateService
  ) {
    this.layoutState = this.layoutStateService.layoutState;
    this.newTheme = new ThemeConfig();
    this.onInitTheme(this.newTheme);
  }

  onThemeChange(themeSelected: ThemeConfig) {
    this.layoutState.config.themeConfig = themeSelected || this.newTheme;
    this.themeService.switchTheme(themeSelected);
  }

  get visible(): boolean {
    return this.layoutState.config.layoutConfig.configSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutState.config.layoutConfig.configSidebarVisible = _val;
  }

  get scale(): number {
    return this.layoutState.config.appConfig.scale;
  }

  set scale(_val: number) {
    this.layoutState.config.appConfig.scale = _val;
  }

  get menuMode(): string {
    return this.layoutState.config.appConfig.menuMode;
  }

  set menuMode(_val: string) {
    this.layoutState.config.appConfig.menuMode = _val;
  }

  get inputStyle(): string {
    return this.layoutState.config.appConfig.inputStyle;
  }

  set inputStyle(_val: string) {
    this.layoutState.config.appConfig.inputStyle = _val;
  }

  get ripple(): boolean {
    return this.layoutState.config.appConfig.ripple;
  }

  set ripple(_val: boolean) {
    this.layoutState.config.appConfig.ripple = _val;
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  applyScale() {
    document.documentElement.style.fontSize = this.scale + 'px';
  }

  onInitTheme(themeSelected: ThemeConfig) {
    this.onThemeChange(themeSelected);
  }
}
