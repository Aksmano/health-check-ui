import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDataViewComponent } from './doctor-data-view.component';

describe('DoctorDataViewComponent', () => {
  let component: DoctorDataViewComponent;
  let fixture: ComponentFixture<DoctorDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDataViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
