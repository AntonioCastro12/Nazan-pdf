import { Component, OnInit } from '@angular/core';
import { TemplateActionService, TemplateStateService } from 'src/app/template';

@Component({
  selector: 'exit-page',
  templateUrl: './exit-page.component.html',
})
export class ExitPageComponent implements OnInit {
  constructor(
    public _templateAction: TemplateActionService,
    public _template: TemplateStateService
  ) {
    sessionStorage.clear();
    localStorage.clear();

    //import { CookieService } from 'ngx-cookie-service';
    // deleteCookie() {
    //   this.cookieService.delete('mi-cookie');
    // }

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('storeSelected');
    sessionStorage.removeItem('userSelected');

    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_stored_at');
    localStorage.removeItem('dark');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('granted_scopes');
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_token_claims_obj');
    localStorage.removeItem('id_token_expires_at');
    localStorage.removeItem('id_token_stored_at');
    localStorage.removeItem('login');
    localStorage.removeItem('nonce');
    localStorage.removeItem('PKCE_verifier');
    localStorage.removeItem('session_state');
    localStorage.removeItem('ssoTryCounts');
  }
  ngOnInit() {
    //this._template.state.identity = null;
  }
}
