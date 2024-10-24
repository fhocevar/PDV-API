import { Injectable } from '@nestjs/common';
import * as dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

@Injectable()
export class ValidationService {
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      console.warn(`[${new Date().toISOString()}] CPF inválido: ${cpf} (tamanho incorreto)`);
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      console.warn(`[${new Date().toISOString()}] CPF inválido: ${cpf} (números repetidos)`);
      return false;
    }

    const calcularDigito = (cpf: string, peso: number): number => {
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (peso - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const primeiroDigito = calcularDigito(cpf, 10);
    const segundoDigito = calcularDigito(cpf, 11);

    return (
      Number(cpf[9]) === primeiroDigito &&
      Number(cpf[10]) === segundoDigito
    );    
  }
  validarCEP(cep: string): boolean {
    cep = cep.replace(/\D/g, '');
    const valido = cep.length === 8;
    if (!valido) {
      console.warn(`[${new Date().toISOString()}] CEP inválido: ${cep}`);
    }
    return valido;
  }

  validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14) {
      console.warn(`[${new Date().toISOString()}] CNPJ inválido: ${cnpj} (tamanho incorreto)`);
      return false;
    }
  
    const calcularDigito = (cnpj: string, peso: number): number => {
      let soma = 0;
      let pos = 0;
      for (let i = 0; i < 12; i++) {
        soma += Number(cnpj[i]) * peso--;
        if (peso < 2) {
          peso = 9;
        }
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    const primeiroDigito = calcularDigito(cnpj, 5);
    const segundoDigito = calcularDigito(cnpj, 6);
  
    return (
      Number(cnpj[12]) === primeiroDigito &&
      Number(cnpj[13]) === segundoDigito
    );
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = regex.test(email);
    if (!valido) {
      console.warn(`[${new Date().toISOString()}] E-mail inválido: ${email}`);
    }
    return valido;
  }

  async verificarDominioEmail(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    
    try {
      const addresses = await resolveMx(domain);
      return addresses.length > 0;
    } catch (error) {
      console.error('Erro ao verificar domínio de e-mail:', error);
      console.error(`[${new Date().toISOString()}] Erro ao verificar domínio de e-mail: ${domain}`, error);
      return false;
    }
  }
}
