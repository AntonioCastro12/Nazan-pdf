import { AngularError } from '@shared/models/system';
import { UserEntity } from './user.entity';
import { UntypedFormGroup } from '@angular/forms';

export class UserState {
  // currentUser: UserEntity = new UserEntity();
  userList: UserEntity[] = [];
  userSelectedList: UserEntity[] = [];
  userSelected: UserEntity = new UserEntity();
  userArray: UserEntity[] = [];

  isPrimeSpinnerUser: boolean = false;
  isStoreSidepanel: boolean = false;
  isSearchVisible: boolean = false;
  showFitlerDialog: boolean = false;
  isProcessing: boolean = false;

  userForm!: UntypedFormGroup;

  getScreenWidth = window.innerWidth;
  getScreenHeight = window.innerHeight;

  sm = 560;
  md = 767;
  lg = 992;
  xl = 1200;

  setStorageUser(data: any) {
    sessionStorage.setItem('userSelected', JSON.stringify(data));
  }

  getStorageUser() {
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
    return this.userSelected;
  }
}
