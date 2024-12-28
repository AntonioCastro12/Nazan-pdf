import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryPodState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryPodStateService {
  private subject = new BehaviorSubject<InventoryPodState>(
    new InventoryPodState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryPodState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
