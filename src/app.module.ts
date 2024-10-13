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


@Module({
  imports: [UsuariosModule, CategoriasModule, ProdutosModule, ClientesModule, PedidosModule, AuthModule,MailModule, PrismaModule, LeituraModule],
  controllers: [AppController],
  providers: [AppService, LeituraService,] //erro ao iniciar InitDataService dependente docker que não carrega WSL em minha maquina
})
export class AppModule {}
