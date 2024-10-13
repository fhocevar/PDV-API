import { IsEmail, IsNotEmpty, IsString,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.456.789-09',
  })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'CEP do cliente',
    example: '12345-678',
  })
  @IsNotEmpty()
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Rua do cliente',
    example: 'Avenida Brasil',
  })
  @IsNotEmpty()
  @IsString()
  rua: string;

  @ApiProperty({
    description: 'Número da residência do cliente',
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  numero: string;

  @ApiProperty({
    description: 'Bairro do cliente',
    example: 'Centro',
  })
  @IsNotEmpty()
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Cidade do cliente',
    example: 'São Paulo',
  })
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({
    description: 'Estado do cliente',
    example: 'SP',
  })
  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsString()
  cnpj?: string;
}