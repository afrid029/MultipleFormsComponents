import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeSelectButtonComponent } from './prime-select-button.component';

describe('PrimeSelectButtonComponent', () => {
  let component: PrimeSelectButtonComponent;
  let fixture: ComponentFixture<PrimeSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeSelectButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
