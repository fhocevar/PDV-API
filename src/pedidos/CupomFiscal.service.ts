import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CupomFiscalService {
    private readonly apiUrl: string = 'https://api.pagseguro.uol.com.br/';
    private readonly credentials = {
      email: 'seu-email@dominio.com',
      token: 'seu-token',
    };
  
    async emitirCupom(pedido: any): Promise<boolean> {
      const cupomFiscalData = {
        clienteId: pedido.cliente_id,
        valorTotal: pedido.valor_total,
        produtos: pedido.pedido_produtos,
      };
  
      const response = await this.chamarApiDeCupomFiscal(cupomFiscalData);
      return response.success;
    }
  
    private async chamarApiDeCupomFiscal(data: any): Promise<any> {
      try {
        const response = await axios.post(`${this.apiUrl}/cupom-fiscal`, data, {
          auth: {
            username: this.credentials.email,
            password: this.credentials.token,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao emitir cupom fiscal:', error);
        throw new Error('Falha na emissão do cupom fiscal');
      }
    }
  }