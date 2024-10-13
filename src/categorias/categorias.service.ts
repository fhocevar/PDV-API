import { Injectable, NotFoundException, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
@Injectable()
export class CategoriasService {
    constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data : {
      descricao: data.descricao,}, });
  }

  async findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) {
      throw new NotFoundException({ mensagem: "Categoria não encontrada" });
    }
    return categoria;
  }
}
