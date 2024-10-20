import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  categoria_id: z.number().min(1, "Categoria é obrigatória"),
  preco: z.number().positive("Preço deve ser um valor positivo"),
  quantidade_estoque: z.number().min(0, "Quantidade deve ser maior ou igual a zero"),
  imagem_url: z.string().optional(),
});

const CreateProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      alert('Produto criado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar produto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Nome</label>
        <input {...register("nome")} className="input" />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>
      <div>
        <label>ID da Categoria</label>
        <input type="number" {...register("categoria_id")} className="input" />
        {errors.categoria_id && <span>{errors.categoria_id.message}</span>}
      </div>
      <div>
        <label>Preço</label>
        <input type="number" {...register("preco")} className="input" />
        {errors.preco && <span>{errors.preco.message}</span>}
      </div>
      <div>
        <label>Quantidade em Estoque</label>
        <input type="number" {...register("quantidade_estoque")} className="input" />
        {errors.quantidade_estoque && <span>{errors.quantidade_estoque.message}</span>}
      </div>
      <div>
        <label>URL da Imagem</label>
        <input {...register("imagem_url")} className="input" />
      </div>
      <button type="submit" className="btn">Criar Produto</button>
    </form>
  );
};

export default CreateProductForm;