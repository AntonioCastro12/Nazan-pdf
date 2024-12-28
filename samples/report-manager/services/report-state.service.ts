import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReportState } from '../models/report.state';

@Injectable({
  providedIn: 'root',
})
export class ReportStateService {
  private subject = new BehaviorSubject<ReportState>(new ReportState());
  private state$ = this.subject.asObservable();

  state = new ReportState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
