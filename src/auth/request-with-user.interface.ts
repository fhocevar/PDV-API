import { Request } from 'express';
import { UsuarioEntity } from '../usuarios/usuarios.entity';
export interface RequestWithUser extends Request {
  user: {id: number; UsuarioEntity;};
}