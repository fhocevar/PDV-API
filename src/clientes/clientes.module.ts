import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidationModule } from '../Common/services/validation.module';
@Module({
  imports: [PrismaModule, ValidationModule],
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService]
})
export class ClientesModule {}
