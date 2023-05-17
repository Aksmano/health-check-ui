import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCreateVisitComponent } from './appointment-create-visit.component';

describe('AppointmentCreateVisitComponent', () => {
  let component: AppointmentCreateVisitComponent;
  let fixture: ComponentFixture<AppointmentCreateVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCreateVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCreateVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
