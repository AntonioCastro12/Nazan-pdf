import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesGeneralSalesState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesGeneralSalesStateService {
  private subject = new BehaviorSubject<SalesGeneralSalesState>(
    new SalesGeneralSalesState()
  );
  private state$ = this.subject.asObservable();

  state = new SalesGeneralSalesState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
