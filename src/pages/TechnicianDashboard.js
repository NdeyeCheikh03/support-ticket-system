import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  // Chargement initial des tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  // 🔁 Récupérer les tickets depuis l'API
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:8000/api/technician/tickets', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(res.data);
    } catch (err) {
      console.error('❌ Erreur de chargement des tickets :', err);
      setError('❌ Erreur de chargement des tickets.');
    }
  };

  // ✅ Mise à jour du statut d’un ticket
  const updateStatus = async (id, statut) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:8000/api/technician/tickets/${id}`, { statut }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTickets(); // Rafraîchir la liste
    } catch (err) {
      console.error('❌ Erreur lors de la mise à jour du ticket :', err);
      alert('❌ Erreur lors de la mise à jour du ticket.');
    }
  };

  return (
    <div className="technician-dashboard">
      <h2>🛠 Tickets à traiter</h2>
      {error && <p className="error">{error}</p>}

      {tickets.length === 0 ? (
        <p>✅ Aucun ticket ouvert ou en cours.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.titre}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priorite}</td>
                <td>{ticket.statut}</td>
                <td>
                  {ticket.statut !== 'En cours' && (
                    <button onClick={() => updateStatus(ticket.id, 'En cours')}>En cours</button>
                  )}
                  {ticket.statut !== 'Résolu' && (
                    <button onClick={() => updateStatus(ticket.id, 'Résolu')}>Résolu</button>
                  )}
                  {ticket.statut !== 'Fermé' && (
                    <button onClick={() => updateStatus(ticket.id, 'Fermé')}>Fermé</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
