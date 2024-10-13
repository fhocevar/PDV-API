import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Eletrônicos',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;
}