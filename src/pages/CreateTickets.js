import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ajout de useNavigate

export default function CreateTicket() {
  const navigate = useNavigate(); // Initialise la navigation
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    priorite: 'Faible'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Soumission du ticket via l'API
      await axios.post('http://127.0.0.1:8000/api/tickets', formData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer VOTRE_TOKEN` si besoin plus tard
        }
      });

      setMessage('✅ Ticket soumis avec succès !');
      setFormData({
        titre: '',
        description: '',
        priorite: 'Faible'
      });

      // Redirection vers la liste des tickets après la soumission réussie
      navigate('/tickets'); // Remplacez '/tickets' par la route appropriée

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
      <h2>Soumettre un ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select
          name="priorite"
          value={formData.priorite}
          onChange={handleChange}
        >
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
          <option value="Critique">Critique</option>
        </select>
        <button type="submit">Envoyer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
