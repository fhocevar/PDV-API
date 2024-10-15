import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Module({
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
