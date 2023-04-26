import { TestBed } from '@angular/core/testing';

import { MedicalOfferService } from './medical-offer.service';

describe('MedicalOfferService', () => {
  let service: MedicalOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
