import { StoreEntity } from './store.entity';

export class StoreState {
  storeSelected: StoreEntity = new StoreEntity();
  storeList: StoreEntity[] = [];
  storeFilterList: StoreEntity[] = [];

  getStoreSelected() {
    let item = JSON.parse(sessionStorage.getItem('storeSelected') as string);
    return item ? item : new StoreEntity();
  }

  setStoreSelected(data: any) {
    sessionStorage.setItem('storeSelected', JSON.stringify(data));
  }

  getStoreList() {
    let item = JSON.parse(sessionStorage.getItem('storeList') as string);
    return item ? item : [];
  }

  setStoreList(data: any) {
    sessionStorage.setItem('storeList', JSON.stringify(data));
  }
}
