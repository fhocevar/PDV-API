import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuarioEntity } from '../usuarios/usuarios.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,    
  ) 
  {console.log('Chave secreta do JWT:', process.env.JWT_SECRET);}

  async validateUser(email: string, password: string): Promise<UsuarioEntity> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.senha)) {
      return user; 
    }
    throw new UnauthorizedException('Credenciais Invalidas');
  }

  async login(email: string, senha: string) {
    
    if (!email || !senha) {
      throw new BadRequestException('E-mail e senha são obrigatórios');
    }
    if (!validator.isEmail(email)) {
      throw new BadRequestException('E-mail inválido');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    console.log('Usuário encontrado:', usuario);
  
    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha correta:', senhaCorreta);

    if (!senhaCorreta) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
  
    const token = this.generateToken(usuario);
    return token;
  }

  private generateToken(user: UsuarioEntity) {
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
  

  async validateUserById(userId: number): Promise<UsuarioEntity | null> {
    return this.prisma.usuario.findUnique({
      where: { id: userId },
    });
  }
}
