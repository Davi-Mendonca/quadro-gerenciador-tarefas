import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomeNovoElementoModalComponent } from './nome-novo-elemento-modal.component';

describe('NomeNovoElementoModalComponent', () => {
  let component: NomeNovoElementoModalComponent;
  let fixture: ComponentFixture<NomeNovoElementoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomeNovoElementoModalComponent]
    });
    fixture = TestBed.createComponent(NomeNovoElementoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
