import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ValidationService } from '../Common/services/validation.service';
import { CepService } from '../Common/services/cep.service';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService, private readonly validationService: ValidationService,
    private readonly cepService: CepService,) {}

  async create(data: CreateClienteDto, userId: number) {  
    console.log('Iniciando criação de cliente:', data);

    if (!this.validationService.validarEmail(data.email)) {
      console.log('E-mail inválido');
      throw new BadRequestException('E-mail inválido.');
    }

    const isDomainValid = await this.validationService.verificarDominioEmail(data.email);
  if (!isDomainValid) {
    throw new BadRequestException('Domínio de e-mail inválido ou não acessível.');
  }

    if (!this.validationService.validarCPF(data.cpf) && !data.cnpj) {
      console.error('Erro: CPF ou CNPJ inválido.', { cpf: data.cpf, cnpj: data.cnpj });
      throw new BadRequestException('CPF ou CNPJ inválido.');
    }
  
    if (data.cnpj && !this.validationService.validarCNPJ(data.cnpj)) {
      console.error('Erro: CNPJ inválido.', { cnpj: data.cnpj });
      throw new BadRequestException('CNPJ inválido.');
    }

    if (!this.validationService.validarCEP(data.cep)) {
      console.error('Erro: CEP inválido.', { cep: data.cep });
      throw new ConflictException('CEP inválido.');
    }

    console.log('Buscando informações do CEP:', data.cep);
    try {
      const cepData = await this.cepService.buscarCep(data.cep).toPromise();
      console.log('Dados do CEP obtidos:', cepData);

      const clienteData = {
        ...data,
        usuarioId: userId,
        endereco: {
          rua: cepData.logradouro,
          bairro: cepData.bairro,
          cidade: cepData.localidade,
          estado: cepData.uf,
        },
      };

      const existingEmail = await this.prisma.cliente.findUnique({
        where: { email: data.email },
      });
      if (existingEmail) {
        console.error('Erro: Email já cadastrado.', { email: data.email });
        throw new ConflictException('Email já cadastrado.');
      }    
      const existingCpf = await this.prisma.cliente.findUnique({
        where: { cpf: data.cpf },
      });
      if (existingCpf) {
        console.error('Erro: CPF já cadastrado.', { cpf: data.cpf });
        throw new ConflictException('CPF já cadastrado.');
      }

      console.log('Criando cliente com os dados:', clienteData);
      return this.prisma.cliente.create({
        data: clienteData,
      });
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      throw new BadRequestException('Erro ao buscar informações do CEP.');
    }
  }

  async findAll(userId: number) {    
    return this.prisma.cliente.findMany({
      where: {
        usuarioId: userId,
      },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException({ mensagem: "Cliente não encontrado" });
    }
    return cliente;
  }

  async update(id: number, data: UpdateClienteDto, userId: number) {    
    console.log('ID do cliente a ser atualizado:', id);
    if (data.cpf && !this.validationService.validarCPF(data.cpf) && !data.cnpj) {
      throw new BadRequestException('CPF ou CNPJ inválido.');
    }
    if (data.cnpj && !this.validationService.validarCNPJ(data.cnpj)) {
      throw new BadRequestException('CNPJ inválido.');
    }
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  
    if (data.email) {
      const existingEmail = await this.prisma.cliente.findUnique({
        where: { email: data.email },
      });
      if (existingEmail && existingEmail.id !== cliente.id) {
        throw new ConflictException('Email já cadastrado.');
      }
    }

    if (data.cpf) {
      const existingCpf = await this.prisma.cliente.findUnique({
        where: { cpf: data.cpf },
      });
      if (existingCpf && existingCpf.id !== cliente.id) {
        throw new ConflictException('CPF já cadastrado.');
      }
    }

    return this.prisma.cliente.update({
      where: { id },
      data: { ...data, usuarioId: userId },
    });
  }
}
