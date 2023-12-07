import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroModalComponent } from './erro-modal.component';

describe('ErroModalComponent', () => {
  let component: ErroModalComponent;
  let fixture: ComponentFixture<ErroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErroModalComponent]
    });
    fixture = TestBed.createComponent(ErroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
