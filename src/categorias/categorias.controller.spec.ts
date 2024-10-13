import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';

describe('CategoriasController', () => {
  let controller: CategoriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
  });

  it('Categorias PDV API Controller', () => {
    expect(controller).toBeDefined();
  });
});
