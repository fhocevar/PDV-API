import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as bwipjs from 'bwip-js';

@Injectable()
export class BarcodeService {
  async generateQRCode(data: string): Promise<string> {
    console.log('Iniciando a geração do QR Code com os dados:', data);
    try {
      const qrCodeUrl = await QRCode.toDataURL(data);
      console.log('QR Code gerado com sucesso:', qrCodeUrl);
      return qrCodeUrl;
    } catch (err) {
      const errorMessage = (err as Error).message || 'Erro ao gerar QR Code';
      console.error('Erro ao gerar QR Code:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  async generateBarcode(data: string): Promise<Buffer> {
    console.log('Iniciando a geração do código de barras com os dados:', data);
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',  // Tipo de código de barras
        text: data,       // Dados a serem codificados
        scale: 3,         // Escala do código de barras
        height: 10,       // Altura do código de barras
        includetext: true, // Incluir texto abaixo do código de barras
        textxalign: 'center',
      }, (err, buffer) => {
        if (err) {
          const errorMessage = (err as Error).message || 'Erro ao gerar código de barras';
          console.error('Erro ao gerar código de barras:', errorMessage);
          reject(new Error(errorMessage));
        } else {
          console.log('Código de barras gerado com sucesso.');
          resolve(buffer);
        }
      });
    });
  }
}
