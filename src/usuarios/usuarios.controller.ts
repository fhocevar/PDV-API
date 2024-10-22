import {Body,Controller,Get,Param, Post, HttpCode,  HttpStatus, Patch, Request, UseGuards, Put, BadRequestException,} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RedefinirSenhaDto } from './dto/redefinir-senha.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../prisma/prisma.service'; 
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService, private prisma: PrismaService,private readonly authService: AuthService, ) {}

  @Post('usuarios')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  
  @Post('login') 
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({ status: 200, description: 'Usuário logado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    console.log('Login DTO recebido:', loginDto);
    const token = await this.authService.login(loginDto.email, loginDto.senha);
    return { token };}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada.' })
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 400, description: 'ID deve ser um número.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async findOne(@Param('id') id: string) {
    const usuarioId = parseInt(id, 10);

  console.log('ID recebido no controlador:', usuarioId);

  if (isNaN(usuarioId)) {
    throw new BadRequestException('ID deve ser um número');
  }
    return this.usuariosService.findOne(+id);
  }

  @Patch('redefinir')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Redefinir senha do usuário' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
  async redefinirSenha(@Body() redefinirSenhaDto: RedefinirSenhaDto) {
    return this.usuariosService.redefinirSenha(redefinirSenhaDto);
  }

  @Get('perfil')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obter perfil do usuário logado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário retornado.' })
  async obterPerfil(@Request() req) {
    console.log('req.user:', req.user);
    const usuarioId = req.user.userId;;    
    console.log('ID recebido no controlador:', usuarioId);    
    if (!usuarioId) {
        throw new BadRequestException('ID deve ser um número');
    }    
    return this.usuariosService.obterPerfil(Number(usuarioId));
}

  @UseGuards(JwtAuthGuard)
@Put()
@UseGuards(AuthGuard('jwt'))
@ApiOperation({ summary: 'Atualizar perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso.' })
async updateProfile(@Request() req, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  const { nome, email, senha } = updateUsuarioDto;
  const userId = req.user.id;
  
  const existingUser = await this.prisma.usuario.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error('Email já está em uso por outro usuário.');
  }

    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;

  const updatedUser = await this.prisma.usuario.update({
    where: { id: userId },
    data: { nome, email, ...(hashedPassword && { senha: hashedPassword }) },
  });
  return updatedUser;}

@Get('admin')
@UseGuards(AuthGuard('jwt'))
@Roles(UserRole.ADMIN)
@ApiOperation({ summary: 'Dados apenas para administradores' })
@ApiResponse({ status: 200, description: 'Dados retornados com sucesso.' })
getAdminData() {
  return 'Dados apenas para administradores';}

@Get('supervisor')
@UseGuards(AuthGuard('jwt'))
@Roles(UserRole.SUPERVISOR)
@ApiOperation({ summary: 'Dados apenas para supervisores' })
@ApiResponse({ status: 200, description: 'Dados retornados com sucesso.' })
getSupervisorData() {
  return 'Dados apenas para supervisores';
}
}


