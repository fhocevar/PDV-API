import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CepService } from './cep.service';
import { ValidationService } from './validation.service';

@Module({
  imports: [HttpModule],
  providers: [ValidationService, CepService],
  exports: [ValidationService, CepService],
})
export class ValidationModule {}
