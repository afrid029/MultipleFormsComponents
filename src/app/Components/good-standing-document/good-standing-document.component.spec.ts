import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodStandingDocumentComponent } from './good-standing-document.component';

describe('GoodStandingDocumentComponent', () => {
  let component: GoodStandingDocumentComponent;
  let fixture: ComponentFixture<GoodStandingDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodStandingDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodStandingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
