import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
