import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PointProgramDetailPointsState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PointProgramDetailPointsStateService {
  private subject = new BehaviorSubject<PointProgramDetailPointsState>(
    new PointProgramDetailPointsState()
  );
  private state$ = this.subject.asObservable();

  state = new PointProgramDetailPointsState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
