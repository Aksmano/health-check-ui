import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestsInsertSchedulesReceptionistComponent } from './medical-tests-insert-schedules-receptionist.component';

describe('MedicalTestInsertSchedulesReceptionistComponent', () => {
  let component: MedicalTestsInsertSchedulesReceptionistComponent;
  let fixture: ComponentFixture<MedicalTestsInsertSchedulesReceptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestsInsertSchedulesReceptionistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTestsInsertSchedulesReceptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
