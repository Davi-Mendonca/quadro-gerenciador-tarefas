import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenhaIncorretaModalComponent } from './senha-incorreta-modal.component';

describe('SenhaIncorretaModalComponent', () => {
  let component: SenhaIncorretaModalComponent;
  let fixture: ComponentFixture<SenhaIncorretaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SenhaIncorretaModalComponent]
    });
    fixture = TestBed.createComponent(SenhaIncorretaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
