import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';

describe('PedidosService', () => {
  let service: PedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('Pedidos PDV API Service', () => {
    expect(service).toBeDefined();
  });
});
