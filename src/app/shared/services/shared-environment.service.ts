import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'src/app/window.provider';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedEnvironmentService {
  production!: boolean;
  name!: string;
  hostname!: string;
  host!: string;
  apiUrl!: string;
  quoteUrl!: string;
  presenterUrl!: string;
  presenterUrlApi!: string;
  emailUrl!: string;
  version!: string;
  enableDebug!: boolean;
  versionCheckURL!: string;
  utilityUrl!: string;
  hydraUrl!: string;

  environment: any = environment;

  constructor(@Inject(WINDOW) private window: Window) {
    let currentHost = this.window.location.hostname;

    // if (currentHost == productionEnvirenment.hostname) {
    //   this.environment = productionEnvirenment;
    // }

    if (currentHost == environment.hostname) {
      this.environment = environment;
    }

    this.name = this.environment.name;
    this.production = this.environment.production;
    this.hostname = this.environment.hostname;
    this.host = this.environment.host;
    this.apiUrl = this.environment.apiUrl;
    this.quoteUrl = this.environment.quoteUrl;
    this.presenterUrl = this.environment.presenterUrl;
    this.presenterUrlApi = this.environment.presenterUrlApi;
    this.emailUrl = this.environment.emailUrl;
    this.version = this.environment.version;
    this.enableDebug = this.environment.enableDebug;
    this.versionCheckURL = this.environment.versionCheckURL;
    this.utilityUrl = this.environment.utilityUrl;
    this.hydraUrl = this.environment.hydraUrl;
  }
}
