import React from 'react';
import Button from './components/Button';
import Form from './components/Form';

const App = () => {
  console.log("App renderizado");
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">PDV API</h1>
      <Form />
      <Button onClick={() => alert('Botão clicado!')}>Clique Aqui</Button>
    </div>
  );
};

export default App;
