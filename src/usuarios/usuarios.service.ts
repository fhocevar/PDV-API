import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedefinirSenhaDto } from './dto/redefinir-senha.dto';
import { MailService } from '../mail/mail.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './usuarios.entity';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService, private mailService: MailService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    console.log('Dados recebidos para criação:', createUsuarioDto);
    const { email, senha, nome, role } = createUsuarioDto;
    console.log('Email:', email);
    console.log('Email:', senha);
    console.log('Nome:', nome);
    console.log('Role:', role);

    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: { ...createUsuarioDto, senha: hashedPassword },
    });

    return usuario;
  }

  async findAll() {
    return this.prisma.usuario.findMany();
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

}
