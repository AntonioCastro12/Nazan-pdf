import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'app-inventory-kardex',
  templateUrl: './inventory-kardex.component.html',
  styleUrls: ['./inventory-kardex.component.scss'],
})
export class InventoryKardexComponent {
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
