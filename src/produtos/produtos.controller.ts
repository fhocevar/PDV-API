import { Body, Controller, Get, Param, Post, Query, UseGuards, Request, NotFoundException, Put, Delete, UseInterceptors, UploadedFile, Patch,BadRequestException } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/request-with-user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../Common/middlewares/file-upload.middleware';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada.' })
  async findAll(@Query('categoria_id') categoriaId: number, @Request() req) {
    const userId = req.user.id;
    return this.produtosService.findAll(categoriaId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
    async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    console.log('ID recebido do parâmetro:', id);
    console.log('User ID:', userId);

    const parsedId = Number(id);
    console.log('ID convertido:', parsedId);

    const produto = await this.produtosService.findOne(Number(id), userId);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  async create(@Request() req: RequestWithUser, @Body() createProdutoDto: CreateProdutoDto) {
    const userId = req.user.id;
    return this.produtosService.create(createProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Request() req, @Body() updateProdutoDto: CreateProdutoDto) {
    const userId = req.user.id;

    const produtoId = parseInt(id, 10);

    if (isNaN(produtoId)) {
      throw new BadRequestException('ID do produto deve ser um número válido.');
    }
    console.log('ID recebido:', produtoId);
    console.log('Dados recebidos para atualização:', updateProdutoDto)
    return this.produtosService.update(produtoId, updateProdutoDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiResponse({ status: 204, description: 'Produto removido com sucesso.' })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        throw new BadRequestException('ID inválido');
    }

    const produto = await this.produtosService.findOne(parsedId, userId);
    if (!produto) {
        throw new NotFoundException('Produto não encontrado');
    }

    await this.produtosService.remove( id,userId);
    return { message: 'Produto excluído com sucesso' };
}

@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.produtosService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/imagem')
  @UseInterceptors(FileInterceptor('imagem', FileUploadService.multerOptions()))
  async uploadImage(@Param('id') id: number, @UploadedFile() imageFile: Express.Multer.File, @Request() req) {
    return this.produtosService.updateImage(id, imageFile);
  }
}



