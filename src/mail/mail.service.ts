import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({    
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });
  }

  private isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async sendEmail(emailOptions: { to: string; subject: string; text: string; html: string }) {
    
    if (!this.isValidEmail(emailOptions.to)) {
      throw new BadRequestException('Endereço de e-mail inválido.');
    }

    if (!emailOptions.subject || !emailOptions.text || !emailOptions.html) {
      throw new BadRequestException('Todos os campos do e-mail são obrigatórios.');
    }

    try {
      await this.transporter.sendMail({
        from: 'your-email@example.com',
        to: emailOptions.to, 
        subject: emailOptions.subject,
        text: emailOptions.text,
        html: emailOptions.html,
      });
      console.log('Email enviado com sucesso para:', emailOptions.to);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      throw new Error('Não foi possível enviar o email. Tente novamente mais tarde.');
    }
  }
}
