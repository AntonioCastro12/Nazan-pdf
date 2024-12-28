import { Component } from '@angular/core';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'segment-affiliated-kipon',
  templateUrl: './segment-affiliated-kipon.component.html',
  styleUrls: ['./segment-affiliated-kipon.component.scss'],
})
export class SegmentAffiliatedKiponComponent {
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
