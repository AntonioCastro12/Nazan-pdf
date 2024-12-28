import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonState } from '../models/common.state';

@Injectable({
  providedIn: 'root',
})
export class CommonStateService {
  private subject = new BehaviorSubject<CommonState>(new CommonState());
  private state$ = this.subject.asObservable();

  state = new CommonState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
