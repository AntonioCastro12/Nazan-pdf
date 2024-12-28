import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'sales-wholesale',
  templateUrl: './sales-wholesale.component.html',
  styleUrls: ['./sales-wholesale.component.scss'],
})
export class SalesWholesaleComponent {
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
