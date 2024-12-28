import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SegmentAffiliatedKiponState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SegmentAffiliatedKiponStateService {
  private subject = new BehaviorSubject<SegmentAffiliatedKiponState>(
    new SegmentAffiliatedKiponState()
  );
  private state$ = this.subject.asObservable();

  state = new SegmentAffiliatedKiponState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
