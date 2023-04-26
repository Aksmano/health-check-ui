import { TestBed } from '@angular/core/testing';

import { DepartmentServiceImpl } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
