import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PointProgramDetailWalletState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PointProgramDetailWalletStateService {
  private subject = new BehaviorSubject<PointProgramDetailWalletState>(
    new PointProgramDetailWalletState()
  );
  private state$ = this.subject.asObservable();

  state = new PointProgramDetailWalletState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
