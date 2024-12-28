import { Injectable } from '@angular/core';
import { TemplateState } from '../models/template.state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateStateService {
  private subject = new BehaviorSubject<TemplateState>(new TemplateState());
  private state$ = this.subject.asObservable();

  state = new TemplateState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
