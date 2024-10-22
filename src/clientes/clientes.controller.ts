import { Body, Controller, Get, Param, Post, UseGuards, Request, NotFoundException, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}   
  
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' })
  async findAll(@Request() req) {
    const userId = req.user.id;
    return this.clientesService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createClienteDto: CreateClienteDto, @Request() req) {
    const userId = req.user.id;
    return this.clientesService.create(createClienteDto, userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('ClientePorUsuario')
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' })
  async find(@Request() req) {
    const userId = req.user.id;
    return this.clientesService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  async findOne(@Param('id') id: string,@Request() req) {
    const userId = req.user.id;
    const cliente = await this.clientesService.findOne(userId);
    
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }
  
@UseGuards(JwtAuthGuard)
@Put(':id')
@ApiOperation({ summary: 'Atualizar um cliente pelo ID' })
@ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
@ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto, @Request() req,) {
  
  const userId = req.user.id;
  const clienteId = Number(id);
  console.log('ID do cliente convertido:', clienteId);
  return this.clientesService.update(clienteId, updateClienteDto, userId);
}
}


