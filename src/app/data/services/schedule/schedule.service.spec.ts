import { TestBed } from '@angular/core/testing';

import { ScheduleServiceImpl } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
