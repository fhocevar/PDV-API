import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  valor: z.number().min(0.01, "Valor deve ser maior que zero"),
  metodo: z.enum(['stripe', 'paypal', 'square', 'pagseguro', 'mercadopago']),
  token: z.string().nonempty("Token é obrigatório"),
});

const PaymentForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/pagamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao processar pagamento');
      setResponseMessage('Pagamento processado com sucesso!');
    } catch (error) {
      console.error(error);
      setResponseMessage('Erro ao processar pagamento');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Valor</label>
        <input type="number" {...register("valor")} step="0.01" className="input" />
        {errors.valor && <span>{errors.valor.message}</span>}
      </div>
      <div>
        <label>Método de Pagamento</label>
        <select {...register("metodo")} className="input">
          <option value="">Selecione um método</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="square">Square</option>
          <option value="pagseguro">PagSeguro</option>
          <option value="mercadopago">Mercado Pago</option>
        </select>
        {errors.metodo && <span>{errors.metodo.message}</span>}
      </div>
      <div>
        <label>Token</label>
        <input {...register("token")} className="input" />
        {errors.token && <span>{errors.token.message}</span>}
      </div>
      <button type="submit" className="btn">Processar Pagamento</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default PaymentForm;