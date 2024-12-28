import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TaDetResumeState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaDetStateService {private subject = new BehaviorSubject<TaDetResumeState>(
  new TaDetResumeState()
);
private state$ = this.subject.asObservable();

state = new TaDetResumeState();



constructor() {
  this.state$.subscribe((state) => (this.state = state));
}
}
