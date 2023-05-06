import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestSchedulesPatientComponent } from './medical-test-schedules-patient.component';

describe('MedicalTestSchedulesPatientComponent', () => {
  let component: MedicalTestSchedulesPatientComponent;
  let fixture: ComponentFixture<MedicalTestSchedulesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestSchedulesPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestSchedulesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
