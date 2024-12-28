import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PointProgramTotalMovementState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PointProgramTotalMovementStateService {
  private subject = new BehaviorSubject<PointProgramTotalMovementState>(
    new PointProgramTotalMovementState()
  );
  private state$ = this.subject.asObservable();

  state = new PointProgramTotalMovementState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
