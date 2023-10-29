import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInexistenteModalComponent } from './usuario-inexistente-modal.component';

describe('UsuarioInexistenteModalComponent', () => {
  let component: UsuarioInexistenteModalComponent;
  let fixture: ComponentFixture<UsuarioInexistenteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioInexistenteModalComponent]
    });
    fixture = TestBed.createComponent(UsuarioInexistenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
