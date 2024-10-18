import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '@prisma/client';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class InitDataService implements OnModuleInit, OnModuleDestroy {
  private prisma = new PrismaClient();

  async onModuleInit() {
    try {
      await this.initializeCategories();
      await this.initializeUsers();
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  private async initializeCategories() {
    const categorias = [
      'Informática',
      'Celulares',
      'Beleza e Perfumaria',
      'Mercado',
      'Livros e Papelaria',
      'Brinquedos',
      'Moda',
      'Bebê',
      'Games',
    ];
  
    for (const descricao of categorias) {
      try {
                const categoriaExistente = await this.prisma.categoria.findFirst({
          where: { descricao },
        });
  
        if (!categoriaExistente) {
          await this.prisma.categoria.create({
            data: {
              descricao,
            },
          });
          console.log(`Categoria '${descricao}' criada com sucesso.`);
        } else {
          console.log(`Categoria '${descricao}' já existe.`);
        }
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
  }

  private async initializeUsers() {
    const usuarios: CreateUsuarioDto[] = [
      {
        nome: 'admin',
        email: 'admin@example.com',
        senha: 'admin123',
        role: UserRole.ADMIN,
      },
      {
        nome: 'usuario',
        email: 'usuario@example.com',
        senha: 'usuario123',
        role: UserRole.USUARIO,
      },
    ];

    for (const usuario of usuarios) {
      try {
        const usuarioExistente = await this.prisma.usuario.findUnique({
          where: { email: usuario.email },
        });

        if (!usuarioExistente) {
          await this.prisma.usuario.create({
            data: {
              nome: usuario.nome,
              email: usuario.email,
              senha: await bcrypt.hash(usuario.senha, 10),
              role: usuario.role,
            },
          });
        } else {
          console.log(`Usuário com email ${usuario.email} já existe.`);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}