import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDocumentComponent } from './degree-document.component';

describe('DegreeDocumentComponent', () => {
  let component: DegreeDocumentComponent;
  let fixture: ComponentFixture<DegreeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreeDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
