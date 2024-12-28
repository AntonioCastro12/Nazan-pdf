import { Component } from '@angular/core';
import { StoreStateService } from 'src/app/layout/config/store-manager/services';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'template-sidebar-left',
  templateUrl: './template-sidebar-left.component.html',
})
export class TemplateSidebarLeftComponent {
  constructor(
    public _user: UserStateService,
    public _store: StoreStateService
  ) {}
}
