import { IsNotEmpty, IsArray } from 'class-validator';

export class CarrinhoDto {
  @IsArray()
  @IsNotEmpty()
  produtos: CarrinhoProdutoDto[];
}

export class CarrinhoProdutoDto {
  @IsNotEmpty()
  produto_id: number;

  @IsNotEmpty()
  quantidade_produto: number;
}