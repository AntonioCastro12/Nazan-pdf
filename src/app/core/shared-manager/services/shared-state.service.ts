import { Injectable } from '@angular/core';
import { SharedState } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private subject = new BehaviorSubject<SharedState>(new SharedState());
  private state$ = this.subject.asObservable();

  state = new SharedState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
