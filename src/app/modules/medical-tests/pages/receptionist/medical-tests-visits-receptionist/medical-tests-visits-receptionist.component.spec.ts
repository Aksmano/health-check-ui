import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsVisitsReceptionistComponent } from './medical-tests-visits-receptionist.component';

describe('MedicalTestVisitsReceptionistComponent', () => {
  let component: MedicalTestsVisitsReceptionistComponent;
  let fixture: ComponentFixture<MedicalTestsVisitsReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsVisitsReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsVisitsReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
