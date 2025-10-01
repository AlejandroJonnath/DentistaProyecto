import { TestBed } from '@angular/core/testing';

import { PatientHistory } from './patient-history';

describe('PatientHistory', () => {
  let service: PatientHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
