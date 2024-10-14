import { Module, forwardRef } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { ProdutosModule } from '../produtos/produtos.module';
import { PagamentoModule } from './pagamento.module';
import { CarrinhoModule } from './carrinho.module';

@Module({
  imports: [PagamentoModule,CarrinhoModule,
    PrismaModule,
    forwardRef(() => ProdutosModule),
  ],
  controllers: [PedidosController],
  providers: [PedidosService, PrismaService],
  exports: [PedidosService],
})
export class PedidosModule {}
