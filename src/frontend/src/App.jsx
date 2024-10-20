import React from 'react';
import CreateUserForm from './components/CreateUserForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ClientesList from './components/Clientes/ClientesList';
import ClienteForm from './components/Clientes/ClienteForm';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1>Meu App de Ponto de Vendas</h1>
      <ClienteForm />
      <ClientesList />
      <CreateUserForm />
      <ResetPasswordForm />
      <h1 className="text-2xl mb-4">Criar Usuário</h1>      
      <h1 className="text-2xl mb-4 mt-8">Redefinir Senha</h1>      
    </div>
  );
};

export default App;