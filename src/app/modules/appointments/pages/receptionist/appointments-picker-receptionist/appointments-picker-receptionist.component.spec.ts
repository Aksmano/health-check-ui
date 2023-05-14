import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsPickerReceptionistComponent } from './appointments-picker-receptionist.component';

describe('AppointmentsPickerReceptionistComponent', () => {
  let component: AppointmentsPickerReceptionistComponent;
  let fixture: ComponentFixture<AppointmentsPickerReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsPickerReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsPickerReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
