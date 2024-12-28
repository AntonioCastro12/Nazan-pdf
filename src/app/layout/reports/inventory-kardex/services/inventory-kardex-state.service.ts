import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryKardexState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryKardexStateService {
  private subject = new BehaviorSubject<InventoryKardexState>(
    new InventoryKardexState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryKardexState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
