import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCardComponent } from './doctors-card.component';

describe('ProductItemComponent', () => {
  let component: DoctorsCardComponent;
  let fixture: ComponentFixture<DoctorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
