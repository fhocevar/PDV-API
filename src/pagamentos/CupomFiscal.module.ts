import { Module } from '@nestjs/common';
import { CupomFiscalService } from './CupomFiscal.service';

@Module({
  providers: [CupomFiscalService],
  exports: [CupomFiscalService],
})
export class CupomFiscalModule {}
