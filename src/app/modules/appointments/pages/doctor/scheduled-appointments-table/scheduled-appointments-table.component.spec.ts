import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduledAppointmentsTableComponent } from './scheduled-appointments-table.component';

describe('ScheduledAppointmentsTableComponent', () => {
  let component: DoctorScheduledAppointmentsTableComponent;
  let fixture: ComponentFixture<DoctorScheduledAppointmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduledAppointmentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduledAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
