import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty({
    description: 'Função do usuário',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  role: string;
  
}