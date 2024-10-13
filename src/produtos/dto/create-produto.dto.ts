import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Smartphone',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  quantidade_estoque: number;

  @ApiProperty({
    description: 'Valor do produto',
    example: 599.99,
  })
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  categoria_id: number;

  @ApiProperty({
    description: 'ID do usuário (opcional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  usuarioId?: number;
}