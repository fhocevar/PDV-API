import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PagamentoService {
  private stripe = new Stripe('sua-chave-secreta', {
    apiVersion: null,
  });

  async processarPagamento(valor: number, token: string): Promise<boolean> {    
    if (valor <= 0) {
      throw new BadRequestException('Valor de pagamento inválido.');
    }

    try {      
      const charge = await this.stripe.charges.create({
        amount: valor * 100,
        currency: 'brl',
        source: token,
        description: 'Pagamento realizado com sucesso.',
      });      
      
      return charge.status === 'succeeded';
    } catch (error) {      
      throw new BadRequestException('Erro ao processar pagamento: ' + error.message);
    }
  }
}
