import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';

describe('CategoriasService', () => {
  let service: CategoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasService],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('categoria PDV API Service', () => {
    expect(service).toBeDefined();
  });
});
