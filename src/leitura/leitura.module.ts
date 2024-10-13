import { Module } from '@nestjs/common';
import { LeituraService } from './leitura.service';
import { LeituraController } from './leitura.controller';

@Module({
  controllers: [LeituraController],
  providers: [LeituraService],
})
export class LeituraModule {}
