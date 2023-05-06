import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsPatientComponent } from './medical-tests-patient.component';

describe('MedicalTestsPatientComponent', () => {
  let component: MedicalTestsPatientComponent;
  let fixture: ComponentFixture<MedicalTestsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
