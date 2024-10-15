import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import mercadopago from 'mercadopago';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PagamentoService {
  private paypalClient: paypal.core.PayPalHttpClient;
  private stripe = new Stripe('sua-chave-secreta', {
    apiVersion: null
  });

  constructor() {    
    mercadopago.configure({
      access_token: 'sua-chave-de-acesso-do-mercadopago',      
    });
  }

  async processarPagamento(valor: number, token: string, metodo: string): Promise<boolean> {
    if (valor <= 0) {
      throw new BadRequestException('Valor de pagamento inválido.');
    }

    switch (metodo) {
      case 'stripe':
        return this.processarPagamentoStripe(valor, token);
      case 'mercadopago':
        return this.processarPagamentoMercadoPago(valor, token);
      case 'paypal':
        return this.processarPagamentoPayPal(valor, token);
      default:
        throw new BadRequestException('Método de pagamento inválido.');
    }
  }

  private async processarPagamentoStripe(valor: number, token: string): Promise<boolean> {
    try {
      const charge = await this.stripe.charges.create({
        amount: valor * 100,
        currency: 'brl',
        source: token, 
        description: 'Pagamento realizado com sucesso.',
      });
      return charge.status === 'succeeded';
    } catch (error) {
      throw new BadRequestException('Erro ao processar pagamento no Stripe: ' + error.message);
    }
  }

  private async processarPagamentoMercadoPago(valor: number, token: string): Promise<boolean> {
    try {
      const paymentData = {
        transaction_amount: valor,
        token,
        payment_method_id: 'pix',
        installments: 1,
        description: 'Pagamento realizado com sucesso.',
        payer: {
          email: 'email-do-cliente@example.com', 
        },
      };  
      
      if (!mercadopago) {
        throw new BadRequestException('Erro na configuração do Mercado Pago.');
      }  
      
      const payment = await mercadopago.payment.save(paymentData);  
      
      if (!payment || payment.status !== 'approved') {
        throw new BadRequestException('Pagamento não aprovado pelo Mercado Pago.');
      }
  
      return true;
    } catch (error) {
      throw new BadRequestException('Erro ao processar pagamento no Mercado Pago: ' + error.message);
    }
  }
  

  private async processarPagamentoPayPal(valor: number, token: string): Promise<boolean> {
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'BRL',
            value: valor.toString(),
          },
        }],
      });

      const response = await this.paypalClient.execute(request);
      return response.statusCode === 201;
    } catch (error) {
      throw new BadRequestException('Erro ao processar pagamento no PayPal: ' + error.message);
    }
  }
}
