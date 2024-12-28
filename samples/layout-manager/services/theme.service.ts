import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LayoutStateService } from './layout.state.service';
import { ThemeConfig } from '../models/theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,

    private layoutStateService: LayoutStateService
  ) {}

  switchTheme(themeSelected: ThemeConfig) {
    let themeLink = this.document.getElementById(
      'theme-css'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = themeSelected.theme;

      this.layoutStateService.layoutState.config.themeConfig = themeSelected;

      sessionStorage.setItem(
        'layoutState',
        JSON.stringify(this.layoutStateService.layoutState)
      );

      // this.layoutStorageService.setStoreLayoutState(
      //   this.layoutStateService.layoutState
      // );
    }
  }
}
