import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeState } from '../models/home.state';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  private subject = new BehaviorSubject<HomeState>(new HomeState());
  private state$ = this.subject.asObservable();

  state = new HomeState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
