import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';

describe('ClientesController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('Clientes PDV API DTO', () => {
    expect(controller).toBeDefined();
  });
});
