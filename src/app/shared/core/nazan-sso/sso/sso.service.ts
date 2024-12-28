import { Injectable } from '@angular/core';
import { Identity } from './identity.interface';
export * from './sso.state';
@Injectable({
  providedIn: 'root',
})
export class SsoService {
  public codeApp: string | null = null;
  public SSOisRequiredLogin: boolean = false;
  public identity!: Identity;

  setIdentity(identity: Identity) {
    this.identity = identity;
  }

  private noAccess() {
    window.location.href = `https://dashboard.impuls.com.mx/?noaccess=${this.codeApp}`;
  }

  verifyAccess(privileges?: Array<string> | ''): boolean {
    if (!this.identity) return false;

    typeof privileges === 'string' &&
      (privileges = privileges.replace(/ /g, '').split(','));

    if (privileges) {
      if (!this.identity.privileges[this.codeApp as string]) {
        this.noAccess();
        return false;
      } else if (
        this.identity.privileges[this.codeApp as string] &&
        privileges.includes('*')
      ) {
        return true;
      } else {
        return this.identity.privileges[this.codeApp as string].some((x) =>
          privileges?.includes(x)
        );
      }
    } else {
      //TODO: no se requieren permisos
      return true;
    }
  }
}
