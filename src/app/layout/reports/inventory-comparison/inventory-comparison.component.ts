import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'inventory-comparison',
  templateUrl: './inventory-comparison.component.html',
  styleUrls: ['./inventory-comparison.component.scss'],
})
export class InventoryComparisonComponent {
  constructor(private _template: TemplateStateService) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

  ngOnDestroy() {
    this._template.state.sidebarOverlayVisible = false;
  }
}
