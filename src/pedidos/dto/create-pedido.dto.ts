import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PedidoProduto {
  @ApiProperty({
    description: 'ID do produto',
    example: 1,
  })
  @IsNotEmpty()
  produto_id: number;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 2,
  })
  @IsNotEmpty()
  quantidade_produto: number;
}

export class CreatePedidoDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  cliente_id: number;

  @ApiProperty({
    description: 'Observação do pedido',
    required: false,
    example: 'Entregar até às 18h',
  })
  @IsOptional()
  @IsNotEmpty()
  observacao?: string;

  @ApiProperty({
    description: 'Lista de produtos do pedido',
    type: [PedidoProduto],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PedidoProduto)
  pedido_produtos: PedidoProduto[];

  @IsString()
  @IsNotEmpty()
  token: string;
}
