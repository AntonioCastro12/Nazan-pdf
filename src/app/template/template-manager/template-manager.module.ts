import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateManagerRoutingModule } from './template-manager-routing.module';
import { TemplateManagerComponent } from './template-manager.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { TemplateTopbarComponent } from './components/template-topbar/template-topbar.component';
import { TemplateFooterComponent } from './components/template-footer/template-footer.component';
import { PrimeNgModule } from 'src/app/shared/vendor/prime-ng';
import { TemplateSidebarMenuComponent } from './components/template-sidebar-menu/template-sidebar-menu.component';
import { TemplateTopbarMenuComponent } from './components/template-topbar-menu/template-topbar-menu.component';
import { TemplateSidebarLeftComponent } from './components/template-sidebar-left/template-sidebar-left.component';
import { TemplateSidebarOverlayComponent } from './components/template-sidebar-overlay/template-sidebar-overlay.component';

@NgModule({
  declarations: [
    TemplateManagerComponent,
    TemplateHomeComponent,
    TemplateTopbarComponent,
    TemplateFooterComponent,

    TemplateSidebarMenuComponent,
    TemplateTopbarMenuComponent,
    TemplateSidebarLeftComponent,
    TemplateSidebarOverlayComponent,
  ],
  imports: [CommonModule, TemplateManagerRoutingModule, PrimeNgModule],
})
export class TemplateManagerModule {}
