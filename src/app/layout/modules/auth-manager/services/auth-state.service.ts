import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { UserInfoEntity } from '../models/auth.entity';
import { AuthState } from '../models/auth.state';
import { TemplateStateService } from 'src/app/template';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private subject = new BehaviorSubject<AuthState>(new AuthState());
  private state$ = this.subject.asObservable();

  state = new AuthState();

  constructor(
    private readonly authApiService: AuthApiService,
    private injector: Injector
  ) {
    this.state$.subscribe((state) => (this.state = state));
  }

  resetUserInfo(): void {
    this.state.userInfo = new UserInfoEntity();
  }

  // loadUserInfo(): void {
  //   let access_token = sessionStorage.getItem('access_token') as string;
  //   this.authApiService.getUserInfo(access_token).subscribe({
  //     next: (data) => {
  //       this.state.userInfo = data;
  //       this.setInfoUser();
  //     },
  //     error: (e) => {
  //       console.error('error loading data', e);
  //       this.resetUserInfo();
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }

  setInfoUser(user?: UserInfoEntity) {
    const layout = this.injector.get(TemplateStateService);
    //layout.state.toogleSidebarMainVisible();
    // this.userInfo = { ...user };
    // this.subject.next(this.userInfo);
  }
}
