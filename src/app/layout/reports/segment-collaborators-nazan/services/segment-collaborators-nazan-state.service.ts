import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SegmentCollaboratorsNazanState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SegmentCollaboratorsNazanStateService {
  private subject = new BehaviorSubject<SegmentCollaboratorsNazanState>(
    new SegmentCollaboratorsNazanState()
  );
  private state$ = this.subject.asObservable();

  state = new SegmentCollaboratorsNazanState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
