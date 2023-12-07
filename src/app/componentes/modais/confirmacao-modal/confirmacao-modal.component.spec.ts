import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoModalComponent } from './confirmacao-modal.component';

describe('ConfirmacaoModalComponent', () => {
  let component: ConfirmacaoModalComponent;
  let fixture: ComponentFixture<ConfirmacaoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacaoModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmacaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
