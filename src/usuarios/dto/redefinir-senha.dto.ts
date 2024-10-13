import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedefinirSenhaDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha antiga do usuário',
    example: 'senha123',
  })
  @IsNotEmpty()
  senha_antiga: string;
  @IsString()
  @MinLength(6)

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  senha_nova: string;
}