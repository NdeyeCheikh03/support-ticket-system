// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user); // callback vers App.js
      setMsg('✅ Connexion réussie');

    } catch (err) {
      setMsg('❌ Identifiants invalides');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
