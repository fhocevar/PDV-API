import { Injectable } from '@nestjs/common';
import { CarrinhoDto } from './dto/carrinho.dto';

@Injectable()
export class CarrinhoService {
  private carrinhos: Map<number, CarrinhoDto> = new Map();

  adicionarProduto(userId: number, produtoId: number, quantidade: number) {
    const carrinho = this.carrinhos.get(userId) || { produtos: [] };
    const produtoExistente = carrinho.produtos.find(item => item.produto_id === produtoId);

    if (produtoExistente) {
      produtoExistente.quantidade_produto += quantidade;
    } else {
      carrinho.produtos.push({ produto_id: produtoId, quantidade_produto: quantidade });
    }

    this.carrinhos.set(userId, carrinho);
  }

  obterCarrinho(userId: number): CarrinhoDto {
    return this.carrinhos.get(userId) || { produtos: [] };
  }

  limparCarrinho(userId: number) {
    this.carrinhos.delete(userId);
  }
}