import { Controller, Post, Get, Body, Param, ParseIntPipe, Inject, forwardRef } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoDto } from './dto/carrinho.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly carrinhoService: CarrinhoService,
    @Inject(forwardRef(() => PedidosService))
    private pedidosService: PedidosService,
  ) {}

  @Post('adicionar')
  adicionarProduto(@Body() carrinhoDto: CarrinhoDto, @Param('userId', ParseIntPipe) userId: number) {
    carrinhoDto.produtos.forEach(produto => {
      this.carrinhoService.adicionarProduto(userId, produto.produto_id, produto.quantidade_produto);
    });
    return { message: 'Produto(s) adicionado(s) ao carrinho com sucesso!' };
  }

  @Get()
  obterCarrinho(@Param('userId', ParseIntPipe) userId: number) {
    return this.carrinhoService.obterCarrinho(userId);
  }

  @Post('finalizar/:clienteId')
  finalizarPedido(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPedidoDto: CreatePedidoDto
  ) {
    return this.pedidosService.criarPedidoDoCarrinho(userId, clienteId, createPedidoDto.token);
  }  
}
