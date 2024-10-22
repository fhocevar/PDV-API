import { Injectable, } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';


@Injectable()
export class FileUploadService {
  static multerOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
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
}