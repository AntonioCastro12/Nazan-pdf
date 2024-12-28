import { Injectable } from '@angular/core';
import { StoreApiService } from './store-api.service';
import { StoreStateService } from './store-state.service';
import { StoreResponse } from 'src/app/layout/config/store-manager/models';
import { StoreEntity } from 'src/app/layout/config/store-manager/models';

@Injectable({
  providedIn: 'root',
})
export class StoreCrudService {
  constructor(
    private _storeApi: StoreApiService,
    private _store: StoreStateService
  ) {}

  // GET ALL STORE
  onGetStoreList() {
    this._storeApi.getStoreList().subscribe({
      next: (data) => {
        const map: StoreEntity[] = data.map((x: StoreResponse) => {
          return {
            id: x.storeInfoId,
            name: x.storeInfoName,
            type: x.storeInfoType,
          };
        });
        this._store.state.storeList = map;
        this._store.state.storeFilterList = map;
      },
      error: (error) => {
        console.error(error);
        return;
      },
      complete: () => {
        return;
      },
    });
  }
}
