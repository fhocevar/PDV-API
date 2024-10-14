import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Module({
  providers: [PagamentoService],
  exports: [PagamentoService], // Exporte o serviço
})
export class PagamentoModule {}
