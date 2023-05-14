import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsReceptionistComponent } from './medical-tests-receptionist.component';

describe('MedicalTestReceptionistComponent', () => {
  let component: MedicalTestsReceptionistComponent;
  let fixture: ComponentFixture<MedicalTestsReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
