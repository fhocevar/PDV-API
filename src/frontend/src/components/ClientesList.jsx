import React, { useEffect, useState } from 'react';
   import { fetchClientes } from '../../api';

   const ClientesList = () => {
       const [clientes, setClientes] = useState([]);

       useEffect(() => {
           const getClientes = async () => {
               const response = await fetchClientes();
               setClientes(response.data);
           };
           getClientes();
       }, []);

       return (
           <div>
               <h2>Lista de Clientes</h2>
               <ul>
                   {clientes.map(cliente => (
                       <li key={cliente.id}>{cliente.nome} - {cliente.email}</li>
                   ))}
               </ul>
           </div>
       );
   };

   export default ClientesList;