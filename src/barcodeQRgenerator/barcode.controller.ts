import { Controller, Post, Body, Res } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { Response } from 'express';

@Controller('barcode')
export class BarcodeController {
  constructor(private readonly barcodeService: BarcodeService) {}

  @Post('qrcode')
  async generateQRCode(@Body('data') data: string, @Res() res: Response) {
    const qrCodeUrl = await this.barcodeService.generateQRCode(data);
    return res.send({ qrCodeUrl });
  }

  @Post('code128')
  async generateBarcode(@Body('data') data: string, @Res() res: Response) {
    const barcodeBuffer = await this.barcodeService.generateBarcode(data);
    res.type('png');
    return res.send(barcodeBuffer);
  }
}