import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsAllPatientComponent } from './medical-tests-all-patient.component';

describe('MedicalTestsAllPatientComponent', () => {
  let component: MedicalTestsAllPatientComponent;
  let fixture: ComponentFixture<MedicalTestsAllPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsAllPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsAllPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
