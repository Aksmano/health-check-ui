import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsPickerReceptionistComponent } from './medical-tests-picker-receptionist.component';

describe('MedicalTestsPickerReceptionistComponent', () => {
  let component: MedicalTestsPickerReceptionistComponent;
  let fixture: ComponentFixture<MedicalTestsPickerReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsPickerReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsPickerReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
