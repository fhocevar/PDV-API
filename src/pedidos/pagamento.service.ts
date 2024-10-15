import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { Client, Environment } from 'square';

@Injectable()
export class PagamentoService {
  private paypalClient: paypal.core.PayPalHttpClient;  
  private squareClient: Client; 
  private stripe: Stripe;

  constructor() {    
    this.stripe = new Stripe('sua-chave-secreta', {
      apiVersion: null,
    });

    this.squareClient = new Client({
      environment: Environment.Sandbox,
      accessToken: 'seu-token-do-square',
    });

    this.paypalClient = new paypal.core.PayPalHttpClient(
      new paypal.core.SandboxEnvironment('seu-cliente-id', 'seu-cliente-secreto')
    );    
  }

  async processarPagamento(valor: number, token: string, metodo: string): Promise<boolean> {
    if (valor <= 0) {
      throw new BadRequestException('Valor de pagamento inválido.');
    }

    switch (metodo) {
      case 'stripe':
        return this.processarPagamentoStripe(valor, token);      
      case 'paypal':
        return this.processarPagamentoPayPal(valor, token);
      case 'square':
        return this.processarPagamentoSquare(valor, token);
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

  private async processarPagamentoSquare(valor: number, token: string): Promise<boolean> {
    try {
      const requestBody = {
        idempotencyKey: new Date().toISOString(),
        amountMoney: { 
          amount: BigInt(valor * 100), 
          currency: 'BRL',
        },
        sourceId: token,
      };

      const response = await this.squareClient.paymentsApi.createPayment(requestBody);
      const paymentId = response.result.payment.id;
    const paymentResponse = await this.squareClient.paymentsApi.getPayment(paymentId);
      return response.result.payment.status === 'COMPLETED'; 
    } catch (error) {
      throw new BadRequestException('Erro ao processar pagamento no Square: ' + error.message);
    }
  }
}
