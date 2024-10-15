import { Injectable, BadRequestException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuarioEntity } from '../usuarios/usuarios.entity';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { Usuario } from '@prisma/client';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private readonly usersService: UsuariosService, ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<UsuarioEntity> {
    console.log('Payload do JWT:', payload);
    const user = await this.usersService.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }}
  
  
