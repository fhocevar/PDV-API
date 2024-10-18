import { Module, forwardRef } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    forwardRef(() => AuthModule), 
    PrismaModule, 
    MailModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, MailService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
