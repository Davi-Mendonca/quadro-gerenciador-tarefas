import { TestBed } from '@angular/core/testing';

import { GerenciadorTarefasService } from './gerenciador-tarefas.service';

describe('GerenciadorTarefasService', () => {
  let service: GerenciadorTarefasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorTarefasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
