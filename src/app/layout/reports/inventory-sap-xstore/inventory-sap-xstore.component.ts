import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'inventory-sap-xstore',
  templateUrl: './inventory-sap-xstore.component.html',
  styleUrls: ['./inventory-sap-xstore.component.scss'],
})
export class InventorySapXstoreComponent {
  constructor(private _template: TemplateStateService) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

  ngOnInit(): void {
    this._template.state.sidebarOverlayVisible = false;
  }
}
