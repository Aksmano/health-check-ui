import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsSchedulesPatientComponent } from './medical-tests-schedules-patient.component';

describe('MedicalTestSchedulesPatientComponent', () => {
  let component: MedicalTestsSchedulesPatientComponent;
  let fixture: ComponentFixture<MedicalTestsSchedulesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsSchedulesPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsSchedulesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
