import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import * as fs from 'fs';
import * as path from 'path';
import { PedidosService } from '../pedidos/pedidos.service';
import { anyOf } from 'square/dist/types/schema';

@Injectable()
export class ProdutosService {
    constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => PedidosService))
    private pedidosService: PedidosService,
  ) {}

  async create(data: CreateProdutoDto) {
    const { categoria_id } = data;
    const categoriaExists = await this.prisma.categoria.findUnique({
      where: { id: categoria_id },
    });

    if (!categoriaExists) {
      throw new NotFoundException({ mensagem: 'Categoria não encontrada' });
    }

    return this.prisma.produto.create({ data });
  }

      
  async findAll(categoria_id?: number, userId?: number) {
    return categoria_id 
      ? this.prisma.produto.findMany({ where: { categoria_id } })
      : this.prisma.produto.findMany();
  }

  async findOne(id: number, userId: number) {
    console.log('ID recebido no serviço:', id);
    const produto = await this.prisma.produto.findUnique({ where: { id: id } });
    if (!produto) {
      throw new NotFoundException({ mensagem: 'Produto não encontrado' });
    }
    return produto;
  }

  async update(id: number, data: CreateProdutoDto, userId: number) {
    console.log('ID do produto:', id);
    console.log('Dados recebidos para atualização:', data);
    const produto = await this.prisma.produto.findUnique({ where: { id: id } });
    console.log('Produto encontrado:', produto);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }
    
    const categoriaExists = await this.prisma.categoria.findUnique({ where: { id: data.categoria_id } });

    if (!categoriaExists) {
      throw new Error('Categoria informada não existe.');
    }
        
    const updatedProduto = await this.prisma.produto.update({
      where: { id },
      data: { ...data, usuarioId: userId },
    });

    return updatedProduto;
  }

  async remove(id: string, userId: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id: Number(id) } });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.prisma.produto.delete({ where: { id: Number(id) } });

    return produto;
  }

  async updateImage(id: number, @UploadedFile() imageFile: Express.Multer.File) {
    console.log('Atualizando imagem para o produto com ID:', id);
    console.log('Arquivo recebido:', imageFile);
    if (!id) {
      throw new BadRequestException('ID não pode ser vazio');
  }
  console.log('ID recebido:', id);

    const produto = await this.prisma.produto.findUnique({ where: { id: id } });
    if (!produto) {
      console.log('Produto não encontrado para ID:', id);      
      console.log('Produto encontrado:', produto);
      console.log('Nova imagem recebida:', imageFile);
      throw new NotFoundException('Produto não encontrado');
    }
    console.log('Produto encontrado:', produto);
    
    if (!imageFile) {
      console.log('Nenhuma nova imagem foi enviada, removendo a imagem existente.');
      if (produto.imagem_url) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', produto.imagem_url);
        console.log('Removendo imagem existente em:', filePath);
        fs.unlinkSync(filePath);
      }
      await this.prisma.produto.update({
        where: { id },
        data: { imagem_url: null },
      });
      return { message: 'Imagem excluída com sucesso' };
    }
    console.log('Nova imagem recebida:', imageFile.filename);
    
    if (produto.imagem_url) {
      const oldFilePath = path.join(process.cwd(), 'uploads', produto.imagem_url);
      console.log('Tentando remover a imagem antiga em:', oldFilePath);
      console.log('Removendo imagem antiga em:', oldFilePath);
      
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
        console.log('Imagem antiga removida com sucesso.');
      } else {
        console.warn('Imagem antiga não encontrada:', oldFilePath);
      }
    }
    
    
    const newImageName = imageFile.filename;
    await this.prisma.produto.update({
      where: { id },
      data: { imagem_url: newImageName },
    });
    console.log('Imagem atualizada com sucesso:', newImageName);

    return { url: `/uploads/${newImageName}` };
  }

  async delete(id: number) {    
    console.log('ID do produto para exclusão:', id);
    const produto = await this.prisma.produto.findUnique({ where: { id : id} });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }  
    console.log('Produto encontrado:', produto);
    const pedidos = await this.pedidosService.findPedidosByProdutoId(id);
    console.log('Pedidos vinculados ao produto:', pedidos);
    if (pedidos.length > 0) {
      throw new BadRequestException('O produto não pode ser excluído pois está vinculado a um ou mais pedidos');
    }  
    
    if (produto.imagem_url) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', produto.imagem_url);
      console.log('Removendo imagem do caminho:', filePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Erro ao remover a imagem:', err);
        } else {
          console.log('Imagem removida com sucesso');      
        }
      });
    }  
    
    await this.prisma.produto.delete({ where: { id: id } });
    console.log('Produto excluído com sucesso');
  
    return { message: 'Produto excluído com sucesso' };
  }

async updateEstoque(id: number, quantidade: number) {
  console.log('ID do produto para atualização de estoque:', id);
  console.log('Quantidade a ser adicionada ao estoque:', quantidade);
  const produto = await this.prisma.produto.findUnique({ where: { id: id } });
  if (!produto) {
      throw new NotFoundException('Produto não encontrado');
  }
  console.log('Produto encontrado:', produto);

  await this.prisma.produto.update({
      where: { id },
      data: {
          quantidade_estoque: {
              increment: quantidade,
          },
      },
  });

  return { message: 'Estoque atualizado com sucesso' };
}
}
