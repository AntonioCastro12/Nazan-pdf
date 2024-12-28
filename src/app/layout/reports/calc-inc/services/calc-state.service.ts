import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TaGralResumeState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalcStateService {
  private subject = new BehaviorSubject<TaGralResumeState>(
    new TaGralResumeState()
  );
  private state$ = this.subject.asObservable();

  state = new TaGralResumeState();

   constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
  
}
