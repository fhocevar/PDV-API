import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Module({
  providers: [CarrinhoService],
  exports: [CarrinhoService],
})
export class CarrinhoModule {}
