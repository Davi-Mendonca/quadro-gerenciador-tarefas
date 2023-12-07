import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNomeElementoModalComponent } from './editar-nome-elemento-modal.component';

describe('EditarNomeElementoModalComponent', () => {
  let component: EditarNomeElementoModalComponent;
  let fixture: ComponentFixture<EditarNomeElementoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarNomeElementoModalComponent]
    });
    fixture = TestBed.createComponent(EditarNomeElementoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
