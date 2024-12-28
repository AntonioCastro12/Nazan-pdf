import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesSearchDeliveredState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesSearchDeliveredStateService {
  private subject = new BehaviorSubject<SalesSearchDeliveredState>(
    new SalesSearchDeliveredState()
  );
  private state$ = this.subject.asObservable();

  state = new SalesSearchDeliveredState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
