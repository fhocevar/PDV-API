import { Controller, Post, Body } from '@nestjs/common';
import { LeituraService } from './leitura.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Leitura')
@Controller('leitura')
export class LeituraController {
  constructor(private readonly leituraService: LeituraService) {}

  @Post('qrcode')
  @ApiOperation({ summary: 'Ler um QR Code a partir de uma imagem' })
  @ApiResponse({ status: 200, description: 'QR Code lido com sucesso.', type: String })
  @ApiResponse({ status: 404, description: 'Nenhum QR Code encontrado.' })
  async lerQRCode(@Body('imagemPath') imagemPath: string) {
    const qrCodeData = await this.leituraService.lerQRCode(imagemPath);
    if (qrCodeData) {
      return { dados: qrCodeData };
    }
    return { mensagem: 'Nenhum QR Code encontrado.' };
  }

  @Post('codigo-barras')
  @ApiOperation({ summary: 'Ler um código de barras a partir de uma imagem' })
  @ApiResponse({ status: 200, description: 'Código de barras lido com sucesso.', type: String })
  @ApiResponse({ status: 404, description: 'Nenhum Código de Barras encontrado.' })
  async lerCodigoDeBarras(@Body('imagemPath') imagemPath: string) {
    const codigoDeBarrasData = await this.leituraService.lerCodigoDeBarras(imagemPath);
    if (codigoDeBarrasData) {
      return { dados: codigoDeBarrasData };
    }
    return { mensagem: 'Nenhum Código de Barras encontrado.' };
  }
}
