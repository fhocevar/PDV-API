import React, { useState } from 'react';

const QRCodeReader = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setError('Por favor, selecione uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('imagem', image);

    try {
      const response = await fetch('/api/ler-qrcode', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao ler QR Code ou código de barras');
      
      const data = await response.json();
      setResult(data.result || 'Nenhum código encontrado');
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Leitor de QR Code / Código de Barras</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Selecionar Imagem:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
        </div>
        <button type="submit" className="btn">Ler Código</button>
      </form>
      {result && <p>Resultado: {result}</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
    </div>
  );
};

export default QRCodeReader;