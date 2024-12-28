import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesInvoiceTotalState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalesInvoiceTotalStateService {
  private subject = new BehaviorSubject<SalesInvoiceTotalState>(
    new SalesInvoiceTotalState()
  );
  private state$ = this.subject.asObservable();

  state = new SalesInvoiceTotalState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
