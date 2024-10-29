import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';

@Module({
  controllers: [BarcodeController],
  providers: [BarcodeService],
})
export class BarcodeModule {}