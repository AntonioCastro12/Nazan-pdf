import { Component } from '@angular/core';
// import { StoreStateService } from '@store-manager/services';
import { TemplateStateService } from '../../services';
import { UserStateService } from '@user-manager/services';
import { StoreStateService } from 'src/app/layout/config/store-manager/services';
import { SystemEnvironmentService } from '@shared/services';

@Component({
  selector: 'template-sidebar-overlay',
  templateUrl: './template-sidebar-overlay.component.html',
})
export class TemplateSidebarOverlayComponent {
  constructor(
    // public _store: StoreStateService,
    public _template: TemplateStateService,
    public _user: UserStateService,
    public _store: StoreStateService,
    public env: SystemEnvironmentService
  ) {}
}
