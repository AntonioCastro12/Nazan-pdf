import { Injectable } from '@angular/core';
import { UserEntity } from '@user-manager/models';
import { UserStateService } from './user-state.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularError } from '@shared/models/system';
import { UserApiService } from './user-api.service';
import { UntypedFormGroup } from '@angular/forms';
import { UserHydraService } from './user-hydra.service';
import { SharedStateService } from 'src/app/core/shared-manager/services';

@Injectable({
  providedIn: 'root',
})
export class UserActionService {
  constructor(
    public _user: UserStateService,
    private router: Router,
    private _ngxSpinner: NgxSpinnerService,
    private _userCrud: UserApiService,
    private _userHydra: UserHydraService,
    private _shared: SharedStateService
  ) {}

  onScrollScreenTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  goUserList(user?: any): void {
    this._ngxSpinner.show();
    this._shared.state.angularError = new AngularError();
    this._userCrud.getUserList().subscribe({
      next: (response) => {
        this._user.state.userList = [];
        this._user.state.userList = response;
        this.router.navigate([`nav/user-manager/list`]);
      },
      error: (error: AngularError) => {
        console.error(error);
        this._shared.state.angularError = error;
        this._ngxSpinner.hide();
      },
      complete: () => {
        this._ngxSpinner.hide();
      },
    });
  }

  // goDetailUserOption(user: any, option?: string): void {
  //   this._ngxSpinner.show();
  //   this._user.state.angularError = new AngularError();
  //   user.id
  //     ? this._userCrud.getUserItem<UserEntity>(user).subscribe({
  //         next: (response) => {
  //           this._user.state.userSelected = new UserEntity();
  //           this._user.state.userSelected = response;
  //           option ? this.router.navigate([`nav/user-manager/${option}`]) : '';
  //         },
  //         error: (error: AngularError) => {
  //           console.error(error);
  //           this._user.state.angularError = error;
  //           this._ngxSpinner.hide();
  //         },
  //         complete: () => {
  //           this._ngxSpinner.hide();
  //         },
  //       })
  //     : '';
  // }

  // onCheckReload(newLead?: 'new') {
  //   if (!newLead) {
  //     this._user.state.userSelected.id == null
  //       ? this.router.navigate(['nav/user-manager/list'])
  //       : '';
  //   } else {
  //     this.onNewUser();
  //   }
  // }

  onNewUser() {
    let userSelected = new UserEntity();
    this._user.state.userSelected = userSelected;
    this.router.navigate(['nav/user-manager/create']);
  }

  goToUserList() {
    this.router.navigate(['nav/user-manager/list']);
  }

  getDirtyValues(userForm: UntypedFormGroup) {
    let form = userForm;
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      }
    });
    return dirtyValues;
  }


}
