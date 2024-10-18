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
      const userIds = await this.initializeUsers();
      await this.initializeClients(userIds);
      await this.initializeProducts(userIds);
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
            data: { descricao },
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
        confirmar_senha: '',
      },
      {
        nome: 'usuario',
        email: 'usuario@example.com',
        senha: 'usuario123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
    ];

    const userIds = {};

    for (const usuario of usuarios) {
      try {
        const usuarioExistente = await this.prisma.usuario.findUnique({
          where: { email: usuario.email },
        });

        if (!usuarioExistente) {
          const novoUsuario = await this.prisma.usuario.create({
            data: {
              nome: usuario.nome,
              email: usuario.email,
              senha: await bcrypt.hash(usuario.senha, 10),
              role: usuario.role,
            },
          });
          userIds[usuario.email] = novoUsuario.id;
        } else {
          console.log(`Usuário com email ${usuario.email} já existe.`);
          userIds[usuario.email] = usuarioExistente.id;
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    return userIds;
  }

  private async initializeClients(userIds: any) {
    const clientes = [
      {
        nome: 'Cliente 1',
        email: 'cliente1@example.com',
        cpf: '12345678901',
        cep: '12345-678',
        rua: 'Rua 1',
        numero: '100',
        bairro: 'Bairro 1',
        cidade: 'Cidade 1',
        estado: 'Estado 1',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 2',
        email: 'cliente2@example.com',
        cpf: '10987654321',
        cep: '87654-321',
        rua: 'Rua 2',
        numero: '200',
        bairro: 'Bairro 2',
        cidade: 'Cidade 2',
        estado: 'Estado 2',
        usuarioId: userIds['admin@example.com'],
      },
    ];

    for (const cliente of clientes) {
      try {
        const clienteExistente = await this.prisma.cliente.findUnique({
          where: { email: cliente.email },
        });

        if (!clienteExistente) {
          await this.prisma.cliente.create({
            data: {
              nome: cliente.nome,
              email: cliente.email,
              cpf: cliente.cpf,
              cep: cliente.cep,
              rua: cliente.rua,
              numero: cliente.numero,
              bairro: cliente.bairro,
              cidade: cliente.cidade,
              estado: cliente.estado,
              usuarioId: cliente.usuarioId,
            },
          });
          console.log(`Cliente '${cliente.nome}' criado com sucesso.`);
        } else {
          console.log(`Cliente com email ${cliente.email} já existe.`);
        }
      } catch (error) {
        console.error('Error creating client:', error);
      }
    }
  }

  private async initializeProducts(userIds: any) {
    const produtos = [
      {
        descricao: 'Produto 1',
        quantidade_estoque: 10,
        valor: 100,
        categoria_id: 1, 
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 2',
        quantidade_estoque: 20,
        valor: 200,
        categoria_id: 1,
        usuarioId: userIds['admin@example.com'],
      },
    ];

    for (const produto of produtos) {
      try {
        const produtoExistente = await this.prisma.produto.findFirst({
          where: { descricao: produto.descricao },
        });

        if (!produtoExistente) {
          await this.prisma.produto.create({
            data: {
              descricao: produto.descricao,
              quantidade_estoque: produto.quantidade_estoque,
              valor: produto.valor,
              categoria_id: produto.categoria_id,
              usuarioId: produto.usuarioId,
            },
          });
          console.log(`Produto '${produto.descricao}' criado com sucesso.`);
        } else {
          console.log(`Produto com descrição '${produto.descricao}' já existe.`);
        }
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
