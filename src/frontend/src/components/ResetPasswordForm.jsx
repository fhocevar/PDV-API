import React from 'react';
   import { useForm } from 'react-hook-form';
   import { z } from 'zod';
   import { zodResolver } from '@hookform/resolvers/zod';

   const schema = z.object({
     email: z.string().email("Email inválido"),
     senha_antiga: z.string().min(6, "Senha antiga é obrigatória"),
     senha_nova: z.string().min(6, "Nova senha é obrigatória"),
   });

   const ResetPasswordForm = () => {
     const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: zodResolver(schema),
     });

     const onSubmit = async (data) => {
       try {
         const response = await fetch('/api/redefinir-senha', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
         });
         if (!response.ok) throw new Error('Erro ao redefinir senha');
         alert('Senha redefinida com sucesso!');
       } catch (error) {
         console.error(error);
         alert('Erro ao redefinir senha');
       }
     };

     return (
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
           <label>Email</label>
           <input {...register("email")} className="input" />
           {errors.email && <span>{errors.email.message}</span>}
         </div>
         <div>
           <label>Senha Antiga</label>
           <input type="password" {...register("senha_antiga")} className="input" />
           {errors.senha_antiga && <span>{errors.senha_antiga.message}</span>}
         </div>
         <div>
           <label>Nova Senha</label>
           <input type="password" {...register("senha_nova")} className="input" />
           {errors.senha_nova && <span>{errors.senha_nova.message}</span>}
         </div>
         <button type="submit" className="btn">Redefinir Senha</button>
       </form>
     );
   };

   export default ResetPasswordForm;