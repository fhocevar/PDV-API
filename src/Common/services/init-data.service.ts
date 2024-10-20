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
      await this.initializeOrders(userIds);
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
      {
        nome: 'supervisor',
        email: 'supervisor@example.com',
        senha: 'supervisor123',
        role: UserRole.SUPERVISOR,
        confirmar_senha: '',
      },
      {
        nome: 'gerente',
        email: 'gerente@example.com',
        senha: 'gerente123',
        role: UserRole.GERENTE,
        confirmar_senha: '',
      },
      {
        nome: 'cliente1',
        email: 'cliente1@example.com',
        senha: 'cliente123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
      {
        nome: 'cliente2',
        email: 'cliente2@example.com',
        senha: 'cliente123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
      {
        nome: 'funcionario1',
        email: 'funcionario1@example.com',
        senha: 'funcionario123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
      {
        nome: 'funcionario2',
        email: 'funcionario2@example.com',
        senha: 'funcionario123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
      {
        nome: 'teste1',
        email: 'teste1@example.com',
        senha: 'teste123',
        role: UserRole.USUARIO,
        confirmar_senha: '',
      },
      {
        nome: 'teste2',
        email: 'teste2@example.com',
        senha: 'teste123',
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
      {
        nome: 'Cliente 3',
        email: 'cliente3@example.com',
        cpf: '12312312312',
        cep: '11111-111',
        rua: 'Rua 3',
        numero: '300',
        bairro: 'Bairro 3',
        cidade: 'Cidade 3',
        estado: 'Estado 3',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 4',
        email: 'cliente4@example.com',
        cpf: '32132132132',
        cep: '22222-222',
        rua: 'Rua 4',
        numero: '400',
        bairro: 'Bairro 4',
        cidade: 'Cidade 4',
        estado: 'Estado 4',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 5',
        email: 'cliente5@example.com',
        cpf: '45645645645',
        cep: '33333-333',
        rua: 'Rua 5',
        numero: '500',
        bairro: 'Bairro 5',
        cidade: 'Cidade 5',
        estado: 'Estado 5',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 6',
        email: 'cliente6@example.com',
        cpf: '78978978978',
        cep: '44444-444',
        rua: 'Rua 6',
        numero: '600',
        bairro: 'Bairro 6',
        cidade: 'Cidade 6',
        estado: 'Estado 6',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 7',
        email: 'cliente7@example.com',
        cpf: '98765432100',
        cep: '55555-555',
        rua: 'Rua 7',
        numero: '700',
        bairro: 'Bairro 7',
        cidade: 'Cidade 7',
        estado: 'Estado 7',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 8',
        email: 'cliente8@example.com',
        cpf: '65432198700',
        cep: '66666-666',
        rua: 'Rua 8',
        numero: '800',
        bairro: 'Bairro 8',
        cidade: 'Cidade 8',
        estado: 'Estado 8',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 9',
        email: 'cliente9@example.com',
        cpf: '12345678902',
        cep: '77777-777',
        rua: 'Rua 9',
        numero: '900',
        bairro: 'Bairro 9',
        cidade: 'Cidade 9',
        estado: 'Estado 9',
        usuarioId: userIds['admin@example.com'],
      },
      {
        nome: 'Cliente 10',
        email: 'cliente10@example.com',
        cpf: '10987654322',
        cep: '88888-888',
        rua: 'Rua 10',
        numero: '1000',
        bairro: 'Bairro 10',
        cidade: 'Cidade 10',
        estado: 'Estado 10',
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
      {
        descricao: 'Produto 3',
        quantidade_estoque: 15,
        valor: 150,
        categoria_id: 2,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 4',
        quantidade_estoque: 25,
        valor: 250,
        categoria_id: 2,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 5',
        quantidade_estoque: 30,
        valor: 300,
        categoria_id: 3,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 6',
        quantidade_estoque: 12,
        valor: 120,
        categoria_id: 3,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 7',
        quantidade_estoque: 18,
        valor: 180,
        categoria_id: 4,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 8',
        quantidade_estoque: 22,
        valor: 220,
        categoria_id: 4,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 9',
        quantidade_estoque: 28,
        valor: 280,
        categoria_id: 5,
        usuarioId: userIds['admin@example.com'],
      },
      {
        descricao: 'Produto 10',
        quantidade_estoque: 35,
        valor: 350,
        categoria_id: 5,
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

  private async initializeOrders(userIds: any) {
    const pedidos = [
      {
        cliente_id: 1,
        observacao: 'Primeiro pedido.',
        pedido_produtos: [
          {
            produto_id: 1,
            quantidade_produto: 2,
          },
          {
            produto_id: 2,
            quantidade_produto: 1,
          },
        ],
        token: 'example_token',
        metodo: 'MASTERCARD', 
      },
      {
        cliente_id: 2, 
        observacao: 'Segundo pedido.',
        pedido_produtos: [
          {
            produto_id: 1,
            quantidade_produto: 5,
          },
        ],
        token: 'example_token',
        metodo: 'PAYPAL',
      },
      {
        cliente_id: 1,
        observacao: 'Terceiro pedido.',
        pedido_produtos: [
          {
            produto_id: 3,
            quantidade_produto: 1,
          },
          {
            produto_id: 4,
            quantidade_produto: 2,
          },
        ],
        token: 'example_token',
        metodo: 'VISA',
      },
      {
        cliente_id: 3,
        observacao: 'Quarto pedido.',
        pedido_produtos: [
          {
            produto_id: 2,
            quantidade_produto: 3,
          },
        ],
        token: 'example_token',
        metodo: 'MASTERCARD',
      },
      {
        cliente_id: 4,
        observacao: 'Quinto pedido.',
        pedido_produtos: [
          {
            produto_id: 1,
            quantidade_produto: 4,
          },
          {
            produto_id: 3,
            quantidade_produto: 1,
          },
        ],
        token: 'example_token',
        metodo: 'PAYPAL',
      },
      {
        cliente_id: 5,
        observacao: 'Sexto pedido.',
        pedido_produtos: [
          {
            produto_id: 5,
            quantidade_produto: 2,
          },
        ],
        token: 'example_token',
        metodo: 'VISA',
      },
      {
        cliente_id: 2,
        observacao: 'Sétimo pedido.',
        pedido_produtos: [
          {
            produto_id: 4,
            quantidade_produto: 1,
          },
          {
            produto_id: 5,
            quantidade_produto: 3,
          },
        ],
        token: 'example_token',
        metodo: 'MASTERCARD',
      },
      {
        cliente_id: 3,
        observacao: 'Oitavo pedido.',
        pedido_produtos: [
          {
            produto_id: 2,
            quantidade_produto: 2,
          },
          {
            produto_id: 3,
            quantidade_produto: 1,
          },
        ],
        token: 'example_token',
        metodo: 'PAYPAL',
      },
      {
        cliente_id: 4,
        observacao: 'Nono pedido.',
        pedido_produtos: [
          {
            produto_id: 1,
            quantidade_produto: 2,
          },
          {
            produto_id: 2,
            quantidade_produto: 2,
          },
          {
            produto_id: 5,
            quantidade_produto: 1,
          },
        ],
        token: 'example_token',
        metodo: 'VISA',
      },
      {
        cliente_id: 5,
        observacao: 'Décimo pedido.',
        pedido_produtos: [
          {
            produto_id: 4,
            quantidade_produto: 3,
          },
        ],
        token: 'example_token',
        metodo: 'MASTERCARD',
      },
    ];
  
    for (const pedido of pedidos) {
      try {
        const clienteExists = await this.prisma.cliente.findUnique({
          where: { id: pedido.cliente_id },
        });
  
        if (!clienteExists) {
          console.log(`Cliente ID ${pedido.cliente_id} não encontrado. Pedido não criado.`);
          continue;
        }
  
        const produtos = await this.prisma.produto.findMany();
        const produtosEncontrados = pedido.pedido_produtos.filter(item => 
          produtos.some(p => p.id === item.produto_id)
        );
  
        if (produtosEncontrados.length !== pedido.pedido_produtos.length) {
          console.log(`Um ou mais produtos não encontrados para o pedido do cliente ID ${pedido.cliente_id}.`);
          continue;
        }
  
        const valor_total = this.calcularValorTotal(pedido.pedido_produtos, produtos);
  
        const novoPedido = await this.prisma.pedido.create({
          data: {
            cliente_id: pedido.cliente_id,
            observacao: pedido.observacao,
            valor_total,
            usuario_id: userIds['admin@example.com'],
            pedido_produtos: {
              create: pedido.pedido_produtos.map(item => ({
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: produtos.find(p => p.id === item.produto_id).valor,
              })),
            },
          },
        });
  
        console.log(`Pedido para o cliente ID '${pedido.cliente_id}' criado com sucesso.`);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    }
  }
  
  private calcularValorTotal(pedido_produtos: any[], produtos: any[]): number {
    return pedido_produtos.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return total + (produto.valor * item.quantidade_produto);
    }, 0);
  }
  

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
