import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedefinirSenhaDto } from './dto/redefinir-senha.dto';
import { MailService } from '../mail/mail.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './usuarios.entity';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
import { UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService, private mailService: MailService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    console.log('Dados recebidos para criação:', createUsuarioDto);
        
    const { email, senha, confirmar_senha, nome, role } = createUsuarioDto;
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Nome:', nome);
    console.log('Role:', role);

    if (senha !== confirmar_senha) {
      throw new BadRequestException('As senhas não coincidem.');
    }
    
    if (!Object.values(UserRole).includes(role)) {
      throw new BadRequestException('Role inválido');
  }
    
    const usuarioExistenteEmail = await this.prisma.usuario.findUnique({
        where: { email },
    });

    if (usuarioExistenteEmail) {
        throw new ConflictException('E-mail já cadastrado.');
    }

    const usuarioExistenteNome = await this.prisma.usuario.findMany({
      where: { nome },
  });

  if (usuarioExistenteNome.length > 0) {
    throw new ConflictException('Nome de usuário já cadastrado.');
}
    
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const usuario = await this.prisma.usuario.create({
        data: {
            nome,              
            email,             
            senha: hashedPassword, 
            role: role as UserRole,             
        },
    });

    return usuario;
}


  async findAll() {
    const usuarios = await this.prisma.usuario.findMany();
  console.log('Usuários encontrados:', usuarios);
  return usuarios;
  }

  async findOne(id: number) {    
    console.log('ID recebido no serviço:', id);    
    if (!id) {
      throw new BadRequestException('ID não pode ser vazio');
    }
    if (id === undefined) {
      throw new BadRequestException('ID não pode ser indefinido');      
    } 
        const usuario = await this.prisma.usuario.findUnique({ where: { id: id } });   
    if (!usuario) {
      throw new NotFoundException({ mensagem: 'Usuário não encontrado' });
    }    
    return usuario;
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new NotFoundException({ mensagem: 'Usuário não encontrado' });
    }
    return usuario;
  }

  async redefinirSenha(redefinirSenhaDto: RedefinirSenhaDto) {
    const { email, senha_antiga, senha_nova } = redefinirSenhaDto;

    if (!email) {
      throw new BadRequestException('Email não pode ser vazio');
    }

    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha_antiga, usuario.senha);
    if (!senhaValida) {
      throw new BadRequestException('Senha antiga está incorreta');
    }

    if (senha_antiga === senha_nova) {
      throw new BadRequestException('A nova senha não pode ser igual à senha antiga');
    }

    const senhaHash = await bcrypt.hash(senha_nova, 10);
    await this.prisma.usuario.update({
      where: { email },
      data: { senha: senhaHash },
    });

    await this.mailService.sendEmail({
      to: email,
      subject: 'Sua senha foi alterada',
      text: 'Informamos que sua senha foi alterada com sucesso.',
      html: '<p>Informamos que sua senha foi alterada com sucesso.</p>',
    });

    return { message: 'Senha alterada com sucesso' };
  }

  async obterPerfil(id: number): Promise<UsuarioEntity> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }
  
  async findById(id: number): Promise<UsuarioEntity | null> {
    if (!id) {
      throw new Error('ID do usuário não pode ser indefinido');
    }
    return this.prisma.usuario.findUnique({
      where: { id: id, },
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, senha } = loginDto;  
    
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
  
    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }  
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }  
    
    const token = this.gerarToken(usuario);
  
    return { token };
  }
  
  private gerarToken(usuario: UsuarioEntity): string {
    return jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

}
