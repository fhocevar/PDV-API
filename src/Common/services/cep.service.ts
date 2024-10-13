import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  buscarCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    return this.httpService.get(url).pipe(
      map(response => response.data),
      catchError(err => throwError(() => new NotFoundException('CEP não encontrado.')))
    );
  }
}