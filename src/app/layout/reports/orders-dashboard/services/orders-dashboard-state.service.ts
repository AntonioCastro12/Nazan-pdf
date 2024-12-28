import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrdersDashboardResponse } from '../models/orders-dashboard.response';
import { StoreEntity } from 'src/app/layout/config/store-manager/models';

class OrdersDashboardState {
  storeSelected: StoreEntity = new StoreEntity();
  storeList: StoreEntity[] = [];
  isLoadingList: boolean = false;
  isVisibleInfo: boolean = false;
  isLoaddingInfo: boolean = false;
  orderStateInfo: OrdersDashboardResponse = new OrdersDashboardResponse();
  filter: string = '';
  filterDays: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class OrdersDashboardStateService {
  private subject = new BehaviorSubject<OrdersDashboardState>(
    new OrdersDashboardState()
  );
  private state$ = this.subject.asObservable();

  state = new OrdersDashboardState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
