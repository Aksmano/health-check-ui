import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAppointmentsTableComponent } from './scheduled-appointments-table.component';

describe('ScheduledAppointmentsTableComponent', () => {
  let component: ScheduledAppointmentsTableComponent;
  let fixture: ComponentFixture<ScheduledAppointmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledAppointmentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
