import { Injectable } from '@angular/core';
import { UserState } from '@user-manager/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private subject = new BehaviorSubject<UserState>(new UserState());
  private state$ = this.subject.asObservable();

  state = new UserState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
