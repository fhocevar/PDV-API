import React from 'react';

const Form = () => {
  console.log("Form renderizado");
  return (
    <form className="my-4">
      <input 
        type="text" 
        placeholder="Digite algo..." 
        className="border rounded p-2 mr-2" 
      />
      <button 
        type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
