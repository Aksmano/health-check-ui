import { TestBed } from '@angular/core/testing';

import { DoctorServiceImpl } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
