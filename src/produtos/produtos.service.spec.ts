import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosService],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('Produtos PDV API service', () => {
    expect(service).toBeDefined();
  });
});
