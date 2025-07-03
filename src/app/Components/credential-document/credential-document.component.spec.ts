import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialDocumentComponent } from './credential-document.component';

describe('CredentialDocumentComponent', () => {
  let component: CredentialDocumentComponent;
  let fixture: ComponentFixture<CredentialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
