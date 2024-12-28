import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryUploadState } from '../models/inventory-upload.state';

@Injectable({
  providedIn: 'root',
})
export class InventoryUploadStateService {
  private subject = new BehaviorSubject<InventoryUploadState>(
    new InventoryUploadState()
  );
  private state$ = this.subject.asObservable();

  state = new InventoryUploadState();

  constructor() {
    this.state$.subscribe((state) => (this.state = state));
  }
}
