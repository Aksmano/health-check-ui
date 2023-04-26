import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDataViewComponent } from './appointment-data-view.component';

describe('AppointmentDataViewComponent', () => {
  let component: AppointmentDataViewComponent;
  let fixture: ComponentFixture<AppointmentDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
