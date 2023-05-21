import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentViewComponent } from './doctor-appointment-view.component';

describe('DoctorAppointmentViewComponent', () => {
  let component: DoctorAppointmentViewComponent;
  let fixture: ComponentFixture<DoctorAppointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
