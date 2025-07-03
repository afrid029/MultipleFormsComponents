import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportDocumentComponent } from './passport-document.component';

describe('PassportDocumentComponent', () => {
  let component: PassportDocumentComponent;
  let fixture: ComponentFixture<PassportDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassportDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
