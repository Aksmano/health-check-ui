import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsScheduleInsertComponent } from './doctors-schedule-insert.component';

describe('DoctorsScheduleInsertComponent', () => {
  let component: DoctorsScheduleInsertComponent;
  let fixture: ComponentFixture<DoctorsScheduleInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsScheduleInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsScheduleInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
