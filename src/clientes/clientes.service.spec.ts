import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('Clientes PDV API Service', () => {
    expect(service).toBeDefined();
  });
});
