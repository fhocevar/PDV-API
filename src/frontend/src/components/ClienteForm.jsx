import React, { useState } from 'react';
   import { createCliente } from '../../api';
   import axios from 'axios';
   
   const ClienteForm = () => {
       const [data, setData] = useState({ nome: '', email: '' });

       const handleChange = (e) => {
           setData({ ...data, [e.target.name]: e.target.value });
       };

       const handleSubmit = async (e) => {
           e.preventDefault();
           await createCliente(data);           
       };

       return (
           <form onSubmit={handleSubmit}>
               <input type="text" name="nome" placeholder="Nome" onChange={handleChange} />
               <input type="email" name="email" placeholder="Email" onChange={handleChange} />
               <button type="submit">Adicionar Cliente</button>
           </form>
       );
   };

   export default ClienteForm;