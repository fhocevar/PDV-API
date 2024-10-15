import { Body, Controller, Get, Param, Post, UseGuards, Request,  Query, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarrinhoService } from './carrinho.service';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Criar um novo pedido' })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createPedidoDto: CreatePedidoDto, @Request() req) {
      const userId = req.user.id;
      return this.pedidosService.create(createPedidoDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Listar todos os pedidos' })
    @ApiResponse({ status: 200, description: 'Lista de pedidos retornada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhum pedido encontrado.' })
    async findAll(@Query('cliente_id') clienteId: number, @Request() req) {
      const userId = req.user.id;
      return this.pedidosService.findAll(clienteId, userId);
    }
  @UseGuards(JwtAuthGuard)  
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }
 
 @UseGuards(JwtAuthGuard)
 @Post('finalizar/:clienteId')
 @ApiOperation({ summary: 'Finalizar um pedido' })
 @ApiResponse({ status: 201, description: 'Pedido finalizado com sucesso.' })
 @ApiResponse({ status: 400, description: 'Dados inválidos.' })
 async finalizarPedido(
   @Param('clienteId', ParseIntPipe) clienteId: number,
   @Request() req,
   @Body() createPedidoDto: CreatePedidoDto,
 ) {
   const userId = req.user.id;
   const token = createPedidoDto.token;
  return this.pedidosService.criarPedidoDoCarrinho(userId, clienteId, token);
 }  
}
