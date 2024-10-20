import React from 'react';
import Button from './components/Button';
import Form from './components/Form';
import CreateProductForm from './components/CreateProductForm';
import CreateOrderForm from './components/CreateOrderForm';
import CreateUserForm from './components/CreateUserForm';
import UsuariosList from './components/UsuariosList';
import ResetPasswordForm from './components/ResetPasswordForm';

const App = () => {
  console.log("App renderizado");
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Ponto de Vendas</h1>
      <Form />
      <Button onClick={() => alert('Botão clicado!')}>Clique Aqui</Button>
      <h1 className="text-3xl">Gerenciamento de Usuários</h1>
      <CreateUserForm />
      <UsuariosList />
      <ResetPasswordForm />
      <h1 className="text-2xl font-bold">Criar Produto</h1>
      <CreateProductForm />
      <h1 className="text-2xl font-bold">Criar Pedido</h1>
      <CreateOrderForm />
      <h1 className="text-2xl font-bold">Processar Pagamento</h1>
      <PaymentForm />
      <QRCodeReader />
      <EmailSender />
    </div>
  );
};

export default App;
