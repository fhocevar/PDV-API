import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InitDataService } from './Common/services/init-data.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { LeituraService } from './leitura/leitura.service';
import { LeituraModule } from './leitura/leitura.module';
import { CarrinhoService } from './pedidos/carrinho.service';
import { PagamentoService } from './pagamentos/pagamento.service';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail/mail.service';

@Module({
  imports: [UsuariosModule, CategoriasModule, ProdutosModule, ClientesModule, PedidosModule, AuthModule,MailModule, PrismaModule, LeituraModule],
  controllers: [AppController],
  providers: [AppService, LeituraService, CarrinhoService, PagamentoService, RolesGuard, JwtAuthGuard, InitDataService, PrismaService, MailService] 
})
export class AppModule {}
