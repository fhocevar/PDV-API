import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Admin Atualizado',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin_atualizado@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123',
  })
  @IsNotEmpty()
  senha: string;
}