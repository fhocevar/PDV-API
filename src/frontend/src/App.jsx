import React from 'react';
import CreateUserForm from './components/CreateUserForm';
import ResetPasswordForm from './components/ResetPasswordForm';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Criar Usuário</h1>
      <CreateUserForm />
      <h1 className="text-2xl mb-4 mt-8">Redefinir Senha</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default App;