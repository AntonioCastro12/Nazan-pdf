import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'inventory-cycle-count',
  templateUrl: './inventory-cycle-count.component.html',
  styleUrls: ['./inventory-cycle-count.component.scss'],
})
export class InventoryCycleCountComponent {
  constructor(private _template: TemplateStateService) {
    let userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    _template.state.roleList = userSelected.privileges.reportesadministrativos;
  }

  ngOnInit(): void {
    this._template.state.sidebarOverlayVisible = false;
  }

  ngOnDestroy() {
    this._template.state.sidebarOverlayVisible = false;
  }
}
