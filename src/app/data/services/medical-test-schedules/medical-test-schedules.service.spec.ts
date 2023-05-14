import { TestBed } from '@angular/core/testing';

import { MedicalTestSchedulesService } from './medical-test-schedules.service';

describe('MedicalTestSchedulesService', () => {
  let service: MedicalTestSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalTestSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
