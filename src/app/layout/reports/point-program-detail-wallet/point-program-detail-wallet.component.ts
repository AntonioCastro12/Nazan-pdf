import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'point-program-detail-wallet',
  templateUrl: './point-program-detail-wallet.component.html',
  styleUrls: ['./point-program-detail-wallet.component.scss'],
})
export class PointProgramDetailWalletComponent {
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
