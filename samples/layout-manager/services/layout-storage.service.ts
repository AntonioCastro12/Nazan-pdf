import { Injectable } from '@angular/core';
import { LayoutState } from '../models/layout.state';
import { TemplateState, TemplateStateService } from 'src/app/template';

@Injectable({
  providedIn: 'root',
})
export class LayoutStorageService {
  constructor(private _template: TemplateStateService) {}

  setLayoutState(templateState: TemplateState) {
    // layoutState.id = `${storeSelected.store_id}-${roleSelected.value}`;
    // layoutState.store_id = `${storeSelected.store_id}`;
    // layoutState.role_value = `${roleSelected.value}`;

    templateState ? (templateState = new TemplateState()) : templateState;

    sessionStorage.setItem('layoutState', JSON.stringify(templateState));
    this._template.state = templateState;
  }

  getLayoutState(): LayoutState {
    // let layoutState = new LayoutState();
    let layoutState = JSON.parse(
      sessionStorage.getItem('layoutState') as string
    );

    this._template.state;
    sessionStorage.setItem('layoutState', JSON.stringify(layoutState));

    return layoutState;
  }
}
