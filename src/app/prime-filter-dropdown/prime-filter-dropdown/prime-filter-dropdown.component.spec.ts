import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeFilterDropdownComponent } from './prime-filter-dropdown.component';

describe('PrimeFilterDropdownComponent', () => {
  let component: PrimeFilterDropdownComponent;
  let fixture: ComponentFixture<PrimeFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimeFilterDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
