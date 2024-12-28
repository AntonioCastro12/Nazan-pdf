import { Component, OnInit } from '@angular/core';
import { Identity } from './sso/identity.interface';
import { SsoService } from './sso/sso.service';
import { $Loading } from 'src/app/shared/popups';
import { TemplateActionService, TemplateStateService } from './template';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //identity!: Identity | null;

  constructor(
    private readonly _sso: SsoService,
    public _template: TemplateStateService,
    private _templateAction: TemplateActionService
  ) {
    //this._templateAction.onCheckAccess();
  }

  ngOnInit(): void {
    // $Loading.open();
  }
  onLogoutSSO = () => {
    this._template.state.identity = null;
  };
  onShowLoginSSO = () => {
    $Loading.close();
  };
  ssoCallback = (
    data: { token: any; identity: Identity },
    refresh: boolean,
    clearIdentity: boolean = false
  ) => {
    if (clearIdentity) {
      sessionStorage.removeItem('access_token');
      this._sso.setToken(null);
      this._template.state.identity = null;
      return;
    }
    if (!data || !data.token) return $Loading.close();

    if (refresh) {
      sessionStorage.setItem('access_token', data.token);
      this._sso.setToken(data.token);
      return;
    }

    if (this._template.state.identity) return;

    //FIXME: obtener permisos desde el back de prenomina
    this._template.state.identity = data.identity;

    // redirection
    // this.router.navigate([route]);

    // guardar token
    sessionStorage.setItem('access_token', data.token);
    this._sso.setToken(data.token);
    $Loading.close();
  };
}
