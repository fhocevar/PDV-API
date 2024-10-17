import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole as PrismaUserRole } from '@prisma/client';

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
    enum: PrismaUserRole,
    example: PrismaUserRole.ADMIN,
  })
  @IsNotEmpty()
  @IsEnum(PrismaUserRole)
  role: PrismaUserRole;
}
