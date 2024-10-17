import { Module } from '@nestjs/common';
import { PagamentoService } from '../pagamentos/pagamento.service';

@Module({
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}
