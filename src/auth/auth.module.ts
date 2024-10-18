import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    forwardRef(() => UsuariosModule), 
    MailModule, 
    PassportModule, 
    PrismaModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UsuariosService,PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
