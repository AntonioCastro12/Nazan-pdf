import { TestBed } from '@angular/core/testing';

import { ReportApiService } from './report-api.service';

describe('reportApiService', () => {
  let service: ReportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
