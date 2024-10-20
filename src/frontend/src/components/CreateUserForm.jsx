import React from 'react';
   import { useForm } from 'react-hook-form';
   import { z } from 'zod';
   import { zodResolver } from '@hookform/resolvers/zod';

   const schema = z.object({
     nome: z.string().min(1, "Nome é obrigatório"),
     email: z.string().email("Email inválido"),
     senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
     confirmar_senha: z.string().min(6, "Confirmação de senha é obrigatória"),
   }).refine(data => data.senha === data.confirmar_senha, {
     message: "As senhas não coincidem",
     path: ["confirmar_senha"],
   });

   const CreateUserForm = () => {
     const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: zodResolver(schema),
     });

     const onSubmit = async (data) => {
       try {
         const response = await fetch('/api/usuarios', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
         });
         if (!response.ok) throw new Error('Erro ao criar usuário');
         alert('Usuário criado com sucesso!');
       } catch (error) {
         console.error(error);
         alert('Erro ao criar usuário');
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
           <label>Email</label>
           <input {...register("email")} className="input" />
           {errors.email && <span>{errors.email.message}</span>}
         </div>
         <div>
           <label>Senha</label>
           <input type="password" {...register("senha")} className="input" />
           {errors.senha && <span>{errors.senha.message}</span>}
         </div>
         <div>
           <label>Confirmar Senha</label>
           <input type="password" {...register("confirmar_senha")} className="input" />
           {errors.confirmar_senha && <span>{errors.confirmar_senha.message}</span>}
         </div>
         <button type="submit" className="btn">Criar Usuário</button>
       </form>
     );
   };

   export default CreateUserForm;