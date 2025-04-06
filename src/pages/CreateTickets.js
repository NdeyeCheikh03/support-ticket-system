import React, { useState } from 'react';

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    priorite: 'Faible'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer VOTRE_TOKEN'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('✅ Ticket soumis avec succès !');
        setFormData({ titre: '', description: '', priorite: 'Faible' });
      } else {
        const res = await response.json();
        setMessage('❌ Erreur : ' + res.message);
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="form-container">
      <h2>Soumettre un ticket</h2>
      <form onSubmit={handleSubmit}>
        <input name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <select name="priorite" value={formData.priorite} onChange={handleChange}>
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
          <option value="Critique">Critique</option>
        </select>
        <button type="submit">Envoyer</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
