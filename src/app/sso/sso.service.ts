import { Injectable } from '@angular/core';
import { Identity } from './identity.interface';
export * from './sso.state';
@Injectable({
  providedIn: 'root',
})
export class SsoService {
  public codeApp: string = '';
  public SSOisRequiredLogin: boolean = false;
  public identity!: Identity | null;
  private token: string = '';

  setIdentity(identity: Identity | null) {
    this.identity = identity;
  }

  private noAccess() {
    window.location.href = `https://dashboard.impuls.com.mx/?noaccess=${this.codeApp}`;
  }

  getPrivilegesApp(): string[] | null {
    return (
      this.identity?.privileges[this.codeApp] ||
      this.identity?.privileges['*'] ||
      null
    );
  }

  verifyAccess(privileges?: Array<string> | ''): boolean {
    if (!this.identity) return false;

    typeof privileges === 'string' &&
      (privileges = privileges.replace(/ /g, '').split(','));

    if (privileges) {
      if (!this.getPrivilegesApp()) {
        this.noAccess();
        return false;
      } else if (privileges.includes('*')) {
        return true;
      } else if (this.getPrivilegesApp()?.includes('*')) {
        return true;
      } else {
        return (this.getPrivilegesApp() || []).some((x) =>
          privileges?.includes(x)
        );
      }
    } else {
      //TODO: no se requieren permisos
      return true;
    }
  }

  setToken(token: string | null) {
    this.token = token == null ? '' : token;
  }

  getToken(): string {
    return this.token;
  }
}
