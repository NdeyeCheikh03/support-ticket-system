import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    role: 'Employé',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/register', form);
      const { token, user } = res.data;

      // ✅ Stocker le token et le rôle dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      setMessage('✅ Inscription réussie ! Redirection...');

      // ✅ Redirection selon le rôle
      if (user.role === 'Employé') {
        navigate('/create');
      } else if (user.role === 'Technicien') {
        navigate('/technician');
      } else if (user.role === 'Admin') {
        navigate('/admin');
      }

    } catch (error) {
      if (error.response) {
        setMessage(`❌ Erreur : ${error.response.data.message}`);
      } else {
        setMessage('❌ Erreur de connexion au serveur.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Employé">Employé</option>
          <option value="Technicien">Technicien</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
