import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
        await this.prisma.categoria.create({
          data: {
            descricao,
          },
        });
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
  }

  private async initializeUsers() {
    const usuarios = [
      {
        nome: 'admin',
        email: 'admin@example.com',
        senha: 'admin123',
        role: 'admin', 
      },
      {        
        nome: 'usuario',
        email: 'usuario@example.com',        
        senha: 'usuario123',
        role: 'usuario',
      },
    ];

    for (const usuario of usuarios) {
      try {
        await this.prisma.usuario.create({
          data: {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            role: usuario.role,
          },
        });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}