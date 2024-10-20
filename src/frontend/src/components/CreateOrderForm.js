import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  cliente_id: z.number().min(1, "Cliente é obrigatório"),
  observacao: z.string().optional(),
  pedido_produtos: z.array(z.object({
    produto_id: z.number().min(1, "Produto é obrigatório"),
    quantidade_produto: z.number().min(1, "Quantidade é obrigatória"),
  })).min(1, "Deve haver pelo menos um produto no pedido"),
  token: z.string().nonempty("Token é obrigatório"),
  metodo: z.string().nonempty("Método de pagamento é obrigatório"),
});

const CreateOrderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar pedido');
      alert('Pedido criado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>ID do Cliente</label>
        <input type="number" {...register("cliente_id")} className="input" />
        {errors.cliente_id && <span>{errors.cliente_id.message}</span>}
      </div>
      <div>
        <label>Observação</label>
        <textarea {...register("observacao")} className="input" />
      </div>
      <div>
        <label>Produtos</label>
        <div className="space-y-2">
          <div>
            <input type="number" {...register("pedido_produtos.0.produto_id")} placeholder="ID do Produto" className="input" />
            <input type="number" {...register("pedido_produtos.0.quantidade_produto")} placeholder="Quantidade" className="input" />
          </div>
          {/* Você pode adicionar mais campos para produtos se necessário */}
        </div>
        {errors.pedido_produtos && <span>{errors.pedido_produtos[0]?.produto_id?.message || errors.pedido_produtos[0]?.quantidade_produto?.message}</span>}
      </div>
      <div>
        <label>Token</label>
        <input {...register("token")} className="input" />
        {errors.token && <span>{errors.token.message}</span>}
      </div>
      <div>
        <label>Método de Pagamento</label>
        <input {...register("metodo")} className="input" />
        {errors.metodo && <span>{errors.metodo.message}</span>}
      </div>
      <button type="submit" className="btn">Criar Pedido</button>
    </form>
  );
};

export default CreateOrderForm;