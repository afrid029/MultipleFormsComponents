import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDocumentComponent } from './employment-document.component';

describe('EmploymentDocumentComponent', () => {
  let component: EmploymentDocumentComponent;
  let fixture: ComponentFixture<EmploymentDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
