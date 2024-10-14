import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PagamentoService {
  async processarPagamento(valor: number): Promise<boolean> {
    
    if (valor <= 0) {
      throw new BadRequestException('Valor de pagamento inválido.');
    }
    
    
    return true;
  }
}