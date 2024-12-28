import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';
import { SalesSearchDeliveredStateService } from './services';

@Component({
  selector: 'sales-search-delivered',
  templateUrl: './sales-search-delivered.component.html',
  styleUrls: ['./sales-search-delivered.component.scss'],
})
export class SalesSearchDeliveredComponent {
  constructor(
    private _template: TemplateStateService,
    public _SalesSearchDelivered: SalesSearchDeliveredStateService
  ) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

  ngOnInit() {
    this._template.state.sidebarOverlayVisible = false;
    this._SalesSearchDelivered.state.isVisibleForm = true;
  }
}
