import { Module, forwardRef } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PedidosModule } from '../pedidos/pedidos.module';

@Module({
  imports: [PrismaModule, forwardRef(() => PedidosModule)],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService],
})
export class ProdutosModule {}
