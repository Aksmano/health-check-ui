import { TestBed } from '@angular/core/testing';

import { MedicalFacilityService } from './medical-facility.service';

describe('MedicalFacilityService', () => {
  let service: MedicalFacilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalFacilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
