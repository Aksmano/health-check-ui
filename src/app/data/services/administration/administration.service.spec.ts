import { TestBed } from '@angular/core/testing';

import { AdministrationServiceImpl } from './administration.service';

describe('AdministrationService', () => {
  let service: AdministrationServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
