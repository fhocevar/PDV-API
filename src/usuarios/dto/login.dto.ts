import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@example.com',
  })
  @IsEmail({}, { message: 'Por favor, forneça um endereço de e-mail válido.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @MinLength(6,{ message: 'A senha deve conter no minino 6 caracteres'})
  senha: string;
}