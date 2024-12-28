import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryComparisonState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryComparisonStateService {
  private subject = new BehaviorSubject<InventoryComparisonState>(
    new InventoryComparisonState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryComparisonState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
