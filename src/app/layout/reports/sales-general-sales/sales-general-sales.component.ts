import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'sales-general-sales',
  templateUrl: './sales-general-sales.component.html',
  styleUrls: ['./sales-general-sales.component.scss'],
})
export class SalesGeneralSalesComponent {
  constructor(private _template: TemplateStateService) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

  ngOnInit() {
    this._template.state.sidebarOverlayVisible = false;
  }
}
