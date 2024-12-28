import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryCycleCountState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryCycleCountStateService {
  private subject = new BehaviorSubject<InventoryCycleCountState>(
    new InventoryCycleCountState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryCycleCountState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
