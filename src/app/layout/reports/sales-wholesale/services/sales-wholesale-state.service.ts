import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesWholesaleState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesWholesaleStateService {
  private subject = new BehaviorSubject<SalesWholesaleState>(
    new SalesWholesaleState()
  );
  private state$ = this.subject.asObservable();

  state = new SalesWholesaleState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
