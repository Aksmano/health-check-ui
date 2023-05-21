import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAppointmentViewComponent } from './receptionist-appointment-view.component';

describe('ReceptionistAppointmentViewComponent', () => {
  let component: ReceptionistAppointmentViewComponent;
  let fixture: ComponentFixture<ReceptionistAppointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistAppointmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
