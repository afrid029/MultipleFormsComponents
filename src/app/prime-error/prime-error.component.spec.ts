import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeErrorComponent } from './prime-error.component';

describe('PrimeErrorComponent', () => {
  let component: PrimeErrorComponent;
  let fixture: ComponentFixture<PrimeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimeErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
