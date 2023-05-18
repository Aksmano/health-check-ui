import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsCreateVisitReceptionistComponent } from './medical-tests-create-visit-receptionist.component';

describe('MedicalTestCreateVisitReceptionistComponent', () => {
  let component: MedicalTestsCreateVisitReceptionistComponent;
  let fixture: ComponentFixture<MedicalTestsCreateVisitReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsCreateVisitReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsCreateVisitReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
