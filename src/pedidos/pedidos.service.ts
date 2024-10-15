import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ProdutosService } from '../produtos/produtos.service'; 
import { CarrinhoService } from './carrinho.service';
import { PagamentoService } from './pagamento.service';

@Injectable()
export class PedidosService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ProdutosService))
    private produtosService: ProdutosService,
    private readonly pagamentoService: PagamentoService,
    @Inject(forwardRef(() => CarrinhoService))
    private readonly carrinhoService: CarrinhoService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, userId: number) {
    const { cliente_id, pedido_produtos, token, metodo } = createPedidoDto;
    
    const clienteExists = await this.prisma.cliente.findUnique({ where: { id: cliente_id } });
    if (!clienteExists) {
      throw new NotFoundException({ mensagem: "Cliente não encontrado" });
    }
    
    const produtos = await this.produtosService.findAll();

    if (produtos.length !== pedido_produtos.length) {
      throw new NotFoundException({ mensagem: "Um ou mais produtos não encontrados" });
    }
    
    pedido_produtos.forEach(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      if (produto.quantidade_estoque < item.quantidade_produto) {
        throw new BadRequestException(`Quantidade insuficiente para o produto ID ${item.produto_id}`);
      }
    });
    
    const valor_total = this.calcularValorTotal(pedido_produtos, produtos);
    
    const pagamentoProcessado = await this.pagamentoService.processarPagamento(valor_total, token, metodo);
    
    if (!pagamentoProcessado) {
      throw new BadRequestException('Falha ao processar pagamento.');
    }
    
    const pedido = await this.prisma.pedido.create({
      data: {
        cliente_id,
        observacao: createPedidoDto.observacao,
        valor_total,
        usuario_id: userId,
        pedido_produtos: {
          create: await Promise.all(
            pedido_produtos.map(async (item) => {
              const produto = await this.produtosService.findOne(userId, item.produto_id);
              return {
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: produto.valor,
              };
            }),
          ),
        },
      },
    });    
    
    for (const item of pedido_produtos) {
      await this.produtosService.updateEstoque(item.produto_id, item.quantidade_produto);
    }

    return pedido;
  }

  private calcularValorTotal(pedido_produtos: any[], produtos: any[]): number {
    return pedido_produtos.reduce((total, item) => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return total + (produto.valor * item.quantidade_produto);
    }, 0);
  }

  async findAll(clienteId?: number, userId?: number) {
    const where = {
      ...(clienteId && { cliente_id: clienteId }),
      usuario_id: userId,
    };

    const pedidos = await this.prisma.pedido.findMany({
      where,
      include: {
        pedido_produtos: true,
      },
    });

    if (!pedidos.length) {
      throw new NotFoundException('Nenhum pedido encontrado');
    }

    return pedidos.map(pedido => ({
      pedido: {
        id: pedido.id,
        valor_total: pedido.pedido_produtos.reduce((total, item) => total + (item.quantidade_produto * item.valor_produto), 0),
        observacao: pedido.observacao,
        cliente_id: pedido.cliente_id,
      },
      pedido_produtos: pedido.pedido_produtos,
    }));
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) {
      throw new NotFoundException({ mensagem: "Pedido não encontrado" });
    }
    return pedido;
  }

  async findPedidosByProdutoId(produtoId: number) {
    const pedidos = await this.prisma.pedidoProduto.findMany({
        where: { produto_id: produtoId },
        include: {
            pedido: true,
        },
    });

    if (!pedidos.length) {
        throw new NotFoundException(`Nenhum pedido encontrado para o produto ID ${produtoId}`);
    }

    return pedidos;
  }

  async criarPedidoDoCarrinho(userId: number, clienteId: number, token: string, metodo: string) {
    const carrinho = this.carrinhoService.obterCarrinho(userId);

    if (carrinho.produtos.length === 0) {
      throw new BadRequestException('O carrinho está vazio.');
    }

    const pedidoDto: CreatePedidoDto = {
      cliente_id: clienteId,
      pedido_produtos: carrinho.produtos,
      token: token, metodo: metodo,
    };

    return this.create(pedidoDto, userId);
  }
}
