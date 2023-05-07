import { TestBed } from '@angular/core/testing';

import { MedicalTestsService } from './medical-tests.service';

describe('MedicalTestService', () => {
  let service: MedicalTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
