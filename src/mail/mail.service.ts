import { Injectable } from '@nestjs/common';
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

  async sendEmail(emailOptions: { to: string; subject: string; text: string; html: string }) {
    try {
      await this.transporter.sendMail({
        from: 'your-email@example.com',
        to: emailOptions.to, 
        subject: emailOptions.subject,
        text: emailOptions.text,
        html: emailOptions.html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Não foi possível enviar o email. Tente novamente mais tarde.');
    }
  }
}
