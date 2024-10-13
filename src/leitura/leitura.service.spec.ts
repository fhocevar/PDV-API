import { Test, TestingModule } from '@nestjs/testing';
import { LeituraService } from './leitura.service';

describe('LeituraService', () => {
  let service: LeituraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeituraService],
    }).compile();

    service = module.get<LeituraService>(LeituraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
