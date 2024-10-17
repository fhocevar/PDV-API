import { Usuario } from '@prisma/client';
import { UserRole as PrismaUserRole } from '@prisma/client';

export class UsuarioEntity implements Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: PrismaUserRole;
}
