import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsScheduleDetailsComponent } from './doctors-schedule-details.component';

describe('DoctorsScheduleDetailsComponent', () => {
  let component: DoctorsScheduleDetailsComponent;
  let fixture: ComponentFixture<DoctorsScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsScheduleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
