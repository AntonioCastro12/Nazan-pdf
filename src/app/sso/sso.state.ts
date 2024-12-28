import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class SsoStateModel {
  actionReload: boolean = false;
  actionLogout: boolean = false;
}

interface ICallback {
  (arg0: SsoStateModel): void;
}

@Injectable({
  providedIn: 'root',
})
export class SsoStateService {
  private SsoSubject = new BehaviorSubject<SsoStateModel>(new SsoStateModel());
  private SsoState = this.SsoSubject.asObservable();
  public state = new SsoStateModel();

  constructor() {
    this.subscribe((data) => {
      this.state = data;

      Object.entries(this.state).forEach((x) => {
        this.watch(this.state, x[0], (varName: string, varValue: any) => {
          this.SsoSubject.next(this.state);
        });
      });
    });
  }

  private watch(context: any, varName: string, set: Function) {
    var value = context[varName];
    Object.defineProperty(context, varName, {
      set: function (v) {
        value = v;
        set && set(varName, value);
      },
      get: function () {
        return value;
      },
    });
  }

  subscribe(callback: ICallback) {
    this.SsoState.subscribe((data) => callback(data));
  }

  setState(record: SsoStateModel) {
    this.SsoSubject.next(record);
  }
}
