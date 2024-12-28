import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
} from '@angular/core';
// import { SsoEventListener } from "./sso.listener";
import { environment } from 'src/environments/environment';
import { Identity } from './identity.interface';
import { SsoService } from './sso.service';
import { CreateLoading } from './loading';
import { SsoStateService } from './sso.service';

@Component({
  selector: 'SSO',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss'],
})
export class SsoComponent implements OnInit {
  @ViewChild('iframe', { static: true }) iframe!: ElementRef;
  @Input() onShowLogin!: Function;
  @Input() onLogout!: Function;
  @Input() callback!: Function;
  @Input() codeApp!: string;
  @Input() showLoginInDevelop: boolean = false; //TODO: <----------------------- TEST
  ssoDashboardUrl: string = environment?.dashboardUrl;
  inRequiedLogin: boolean = true;
  identity!: Identity | null;
  constructor(
    private ssoService: SsoService,
    private ssoState: SsoStateService
  ) {
    CreateLoading();

    this.ssoState.subscribe((data) => {
      if (data.actionLogout) {
        data.actionLogout = false;
        this.onLogout && this.onLogout();
        this.logout();
      }
      if (data.actionReload) {
        data.actionReload = false;
        this.reload();
      }
    });

    // this.ssoEventListener.subscribe("reload", () => {
    //     this.reload();
    // });
    // this.ssoEventListener.subscribe("identity", (callback: Function) =>
    //     callback(this.identity, this.codeApp)
    // );
    // this.ssoEventListener.subscribe("logout", () => {
    //     // if (window["SSOisRequiredLogin"]) return;
    //     if (this.ssoProvider.SSOisRequiredLogin) return;
    //     // window["SSOisRequiredLogin"] = true;
    //     this.ssoProvider.SSOisRequiredLogin = true;
    //     this.logout();
    // });
  }
  @HostListener('addEventListener')
  addEventListener() {
    console.log('addEventListener');
  }

  @HostListener('attachEvent')
  addAttachEvent() {
    console.log('attachEvent');
  }

  ngOnInit() {
    this.ssoService.codeApp = this.codeApp;

    // var eventMethod = window.addEventListener()
    //   ? 'addEventListener'
    //   : 'attachEvent';

    let eventMethod = 'addEventListener';

    var eventer = window[eventMethod as keyof Window];

    var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    eventer(messageEvent, (e: any) => {
      const { action, value } = e.data;

      if (action === 'showLogin') return this.showLogin();
      if (action === 'sendAuth') return this.auth(value, false);
      if (action === 'refresh') return this.auth(value, true);
      if (action === 'reloadAndShowLogin') {
        this.showLogin();
        //FIXME: test -> this.callback && this.callback({}, false, false);
        this.identity = null;
        this.callback && this.callback({}, false, true);
        return;
      }
    });

    // if (!this.showLoginInDevelop && !environment.production) {
    //   const identity: Identity = {
    //     at_hash: 'noProduccionHash',
    //     aud: ['xstore'],
    //     auth_time: 9999999,
    //     exp: 9999999,
    //     grupo: 'xstore',
    //     iat: 9999999,
    //     iss: 'noProduccionIss',
    //     jti: 'noProduccionJti',
    //     nombre: 'userTest',
    //     nonce: 'noProduccionNonce',
    //     privileges: { '*': ['*'] },
    //     rat: 9999999,
    //     sid: '997',
    //     sub: '997',
    //     tienda: '29',
    //     tiendaNombre: 'SUCURSAL 29 MONTERREY',
    //     tiendaTipo: 'menudeo',
    //   };

    //   this.identity = identity;
    //   this.ssoService.setIdentity(identity);
    //   this.callback &&
    //     this.callback({ token: 'noProduccionToken', identity }, false);
    // } else {
    // si esta en  produccion
    // iniciar SSO hydra
    const el: HTMLIFrameElement = this.iframe.nativeElement;
    el.setAttribute('src', this.ssoDashboardUrl);
    // }
  }

  showLogin() {
    this.onShowLogin && this.onShowLogin();
    window['LOADING' as keyof Window] &&
      window['LOADING' as keyof Window](false);
    this.viewIframe(true);
  }

  viewIframe(show: boolean = true) {
    Object.assign(
      this.iframe.nativeElement.style,
      show
        ? {
            display: 'block',
            pointerEvents: 'all',
          }
        : {
            display: 'none',
            pointerEvents: 'none',
          }
    );
  }

  private withAccess(): boolean {
    return this.identity?.privileges[this.codeApp] ||
      this.identity?.privileges['*'] ||
      this.identity?.privileges['xstore']
      ? true
      : false;
  }

  auth(data: { token: string; identity: any }, refresh: boolean) {
    // window["SSOisRequiredLogin"] = false;
    this.ssoService.SSOisRequiredLogin = false;
    // console.log(this.inRequiedLogin);
    // debugger;
    // this.inRequiedLogin = false;
    this.viewIframe(false);
    this.identity = data.identity;

    this.ssoService.setIdentity(data.identity);

    // Verify Access
    if (this.withAccess()) {
      this.callback && this.callback(data, refresh);
    } else {
      alert('No posee acceso a este aplicativo');
      location.href = environment.dashboardUrl;
    }
  }

  logout = () => {
    this.iframe.nativeElement.contentWindow.postMessage(
      {
        action: 'logout',
      },
      '*'
    );
    sessionStorage.removeItem('access_token');
    this.ssoService.setToken(null);
    this.ssoService.identity = null;
    this.viewIframe(true);
  };

  reload() {
    if (this.inRequiedLogin) return;
    this.inRequiedLogin = true;
    this.showLogin();
    this.iframe.nativeElement.contentWindow.postMessage(
      {
        action: 'reload',
      },
      '*'
    );
    this.identity = null;
    this.ssoService.setIdentity(null);
    this.callback && this.callback({}, false, true);
  }

  loading(value: boolean = true, msg: string = 'cargando') {
    return window['LOADING' as keyof Window](value, msg);
  }
}
