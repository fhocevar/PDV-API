import { Module } from '@nestjs/common';
import { CupomFiscalService } from './CupomFiscal.service';

@Module({
  providers: [CupomFiscalService],
  exports: [CupomFiscalService], // Certifique-se de exportá-lo
})
export class CupomFiscalModule {}
