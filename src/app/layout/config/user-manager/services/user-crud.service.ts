import { Injectable } from '@angular/core';
import { UserEntity } from '@user-manager/models';
import { UserApiService } from './user-api.service';
import { UserStateService } from './user-state.service';
import { ToastrService } from 'ngx-toastr';
import { UserActionService } from './user-action.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularError } from '@shared/models';
import { StoreStateService } from 'src/app/layout/config/store-manager/services';

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  constructor(
    private _userApi: UserApiService,
    private _user: UserStateService,
    private _store: StoreStateService,
    private _toastr: ToastrService,
    private _userAction: UserActionService,
    private _ngxSpinner: NgxSpinnerService
  ) {}

  // // POST
  // onPostUserItem(user: UserEntity) {
  //   this._userApi.postUserItem(user).subscribe({
  //     next: (data) => {
  //       this._user.state.userSelected = data;
  //       this._user.state.userSelected = data;

  //       this._toastr.success(
  //         'Usuario creado'
  //         // this._user.state.userSelected.firstName
  //       );
  //       this._userAction.goDetailUserOption(data, 'read');
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }

  // // GET ALL
  // onGetUserList() {
  //   this._userApi.getUserList().subscribe({
  //     next: (data) => {
  //       this._user.state.userList = data;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }

  // // GET ALL FILTER
  // onGetUserFilterList(search: string) {
  //   this._userApi.getUserFilterList(search).subscribe({
  //     next: (data) => {
  //       this._user.state.userList = data;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }

  // // GET ITEM
  // // onGetUserItem(user: UserEntity) {
  // //   this._userApi.getUserItem(user).subscribe({
  // //     next: (data) => {
  // //       this._user.state.userSelected = { ...data };
  // //     },
  // //     error: (error) => {
  // //       console.error(error);
  // //       return;
  // //     },
  // //     complete: () => {
  // //       return;
  // //     },
  // //   });
  // // }

  // // PATCH ITEM
  // // onPatchUserItem(user: UserEntity) {
  // //   this._userApi.patchUserItem(user).subscribe({
  // //     next: (data) => {
  // //       this._user.state.userSelected = data;
  // //       this._user.state.userSelected = data;

  // //       this._toastr.success(
  // //         'Usuario actualizado'
  // //         // this._user.state.userSelected.firstName
  // //       );
  // //       this._userAction.goDetailUserOption(data, 'read');
  // //     },
  // //     error: (error) => {
  // //       console.error(error);
  // //       return;
  // //     },
  // //     complete: () => {
  // //       return;
  // //     },
  // //   });
  // }

  // // DELETE ITEM
  // onDeleteUserItem(user: UserEntity) {
  //   this._userApi.deleteUserItem(user).subscribe({
  //     next: (data) => {
  //       // this._toastr.success(data.firstName, 'Usuario Eliminado');
  //       this._userAction.goUserList();
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }

  // // DELETE LIST
  // onDeleteUserList(itemList: UserEntity[]) {
  //   this._ngxSpinner.show();
  //   this._user.state.angularError = new AngularError();

  //   this._userApi.deleteUserList(itemList).subscribe({
  //     next: (data) => {
  //       this._toastr.success('Registros eliminados');
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       window.location.reload();
  //     },
  //   });
  // }

  // // GET ALL STORE
  // onGetStoreList() {
  //   this._userApi.getStoreList().subscribe({
  //     next: (data) => {
  //       const filter = data.map((x: any) => {
  //         return {
  //           id: x.storeInfoId,
  //           name: x.storeInfoName,
  //           type: x.storeInfoType,
  //         };
  //       });
  //       this._store.state.storeList = filter;
  //       this._store.state.storeFilterList = filter;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       return;
  //     },
  //     complete: () => {
  //       return;
  //     },
  //   });
  // }
}
