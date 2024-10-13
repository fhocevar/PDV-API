import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';

describe('PedidosController', () => {
  let controller: PedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
  });

  it('Pedidos PDV API Controller', () => {
    expect(controller).toBeDefined();
  });
});
