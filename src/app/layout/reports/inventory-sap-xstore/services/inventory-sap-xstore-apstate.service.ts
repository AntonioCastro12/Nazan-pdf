import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventorySapXstoreState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventorySapXstoreApstateService {
  private subject = new BehaviorSubject<InventorySapXstoreState>(
    new InventorySapXstoreState()
  );
  private state$ = this.subject.asObservable();

  state = new InventorySapXstoreState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
