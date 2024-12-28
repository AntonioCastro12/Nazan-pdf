import { TestBed } from '@angular/core/testing';
import { reportStateService } from './report-state.service';


describe('reportStateService', () => {
  let service: reportStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(reportStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
