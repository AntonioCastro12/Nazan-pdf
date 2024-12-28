import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'sales-invoice-total',
  templateUrl: './sales-invoice-total.component.html',
  styleUrls: ['./sales-invoice-total.component.scss'],
})
export class SalesInvoiceTotalComponent {
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
