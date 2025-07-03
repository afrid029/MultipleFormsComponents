import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeDatepickerComponent } from './prime-datepicker.component';

describe('PrimeDatepickerComponent', () => {
  let component: PrimeDatepickerComponent;
  let fixture: ComponentFixture<PrimeDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimeDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
