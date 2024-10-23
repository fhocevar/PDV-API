import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  private uploadsDir: string;

  constructor() {    
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    console.log('Diretório de uploads:', this.uploadsDir);
    this.ensureUploadsDirExists();
  }

  private ensureUploadsDirExists() {
    if (!fs.existsSync(this.uploadsDir)) {
      console.error('Diretório de uploads não encontrado, criando...');
      fs.mkdirSync(this.uploadsDir, { recursive: true });
      console.log('Pasta de uploads criada:', this.uploadsDir);
    }
  }

  static multerOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(process.cwd(), 'uploads'));
        },
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimes.includes(file.mimetype)) {
          return cb(new Error('Formato de arquivo não permitido'), false);
        }
        cb(null, true);
      },
    };
  }

  async deleteFile(fileName: string) {
    const filePath = path.join(this.uploadsDir, fileName);
    console.log('Tentando excluir o arquivo em:', filePath);
    
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Arquivo excluído com sucesso:', filePath);
      } else {
        console.error('Arquivo não encontrado:', filePath);
        throw new NotFoundException(`Arquivo não encontrado: ${fileName}`);
      }
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error);
      throw new BadRequestException(`Erro ao excluir o arquivo: ${error.message}`);
    }
  }
}
