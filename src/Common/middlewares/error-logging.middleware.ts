import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ErrorLoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.error('Erro:', {
          status: res.statusCode,
          message: res.statusMessage,
          body: req.body,
        });
      }
    });
    next();
  }
}
