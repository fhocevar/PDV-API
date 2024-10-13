import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.456.789-09',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;
}