import { Injectable } from '@nestjs/common';
import { BrowserMultiFormatReader } from '@zxing/library';
import * as fs from 'fs';

@Injectable()
export class LeituraService {
  async lerQRCode(imagemPath: string): Promise<string | null> {
    const codeReader = new BrowserMultiFormatReader();
    const imagem = await fs.promises.readFile(imagemPath);
    const resultado = await codeReader.decodeFromImageUrl(imagemPath);
    return resultado?.getText() || null;
  }

  async lerCodigoDeBarras(imagemPath: string): Promise<string | null> {
    const codeReader = new BrowserMultiFormatReader();
    const resultado = await codeReader.decodeFromImageUrl(imagemPath);
    return resultado?.getText() || null;
  }
}
