import { Injectable } from '@angular/core';
import { StoreState } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreStateService {
  private subject = new BehaviorSubject<StoreState>(new StoreState());
  private state$ = this.subject.asObservable();

  state = new StoreState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
