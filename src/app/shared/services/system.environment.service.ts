import { Injectable } from '@angular/core';

import { environment } from 'src/environments';

import { VERSION } from 'src/environments/version';

@Injectable({
  providedIn: 'root',
})
export class SystemEnvironmentService {
  public production = environment.production;
  public host = environment.host;
  public apiUrl = environment.apiUrl;
  public utilityUrl = environment.utilityUrl;
  public VERSION = VERSION;
  constructor() {}
}
