import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryStockResumeState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CreditoStateService {
  private subject = new BehaviorSubject<InventoryStockResumeState>(
    new InventoryStockResumeState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryStockResumeState();

  

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
