import React, { useState } from 'react';

const EmailSender = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailOptions = { to, subject, text, html };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailOptions),
      });

      if (!response.ok) throw new Error('Erro ao enviar email');

      setMessage('Email enviado com sucesso!');
      setError('');      
      setTo('');
      setSubject('');
      setText('');
      setHtml('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Enviar Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email Destinatário:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label>Assunto:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label>Texto:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label>HTML (opcional):</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="btn">Enviar Email</button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
    </div>
  );
};

export default EmailSender;