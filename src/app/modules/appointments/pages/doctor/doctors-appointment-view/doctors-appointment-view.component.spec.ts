import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAppointmentViewComponent } from './doctors-appointment-view.component';

describe('DoctorsAppointmentViewComponent', () => {
  let component: DoctorsAppointmentViewComponent;
  let fixture: ComponentFixture<DoctorsAppointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsAppointmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
