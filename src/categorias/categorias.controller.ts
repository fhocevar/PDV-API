import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    @Post()
    @ApiOperation({ summary: 'Criar uma nova categoria' })
    @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createCategoriaDto: CreateCategoriaDto) {
      return this.categoriasService.create(createCategoriaDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todas as categorias' })
    @ApiResponse({ status: 200, description: 'Lista de categorias retornada.' })
    async findAll() {
      return this.categoriasService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Atualizar uma categoria' })
    @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso.' })
    async findOne(@Param('id') id: string) {
      return this.categoriasService.findOne(+id);
    }
    
}
