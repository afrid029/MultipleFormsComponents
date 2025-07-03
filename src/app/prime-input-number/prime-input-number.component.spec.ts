import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputNumberComponent } from './prime-input-number.component';

describe('PrimeInputNumberComponent', () => {
  let component: PrimeInputNumberComponent;
  let fixture: ComponentFixture<PrimeInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeInputNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
