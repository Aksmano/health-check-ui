import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsSearchPatientComponent } from './medical-tests-search-patient.component';

describe('MedicalTestsPatientComponent', () => {
  let component: MedicalTestsSearchPatientComponent;
  let fixture: ComponentFixture<MedicalTestsSearchPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsSearchPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsSearchPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
