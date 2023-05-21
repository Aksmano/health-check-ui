import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentSchedulesComponent } from './add-appointment-schedules.component';

describe('AddAppointmentSchedulesComponent', () => {
  let component: AddAppointmentSchedulesComponent;
  let fixture: ComponentFixture<AddAppointmentSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppointmentSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
