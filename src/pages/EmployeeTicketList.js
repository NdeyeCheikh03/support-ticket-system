import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function EmployeeTicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user')).id;

  // Utiliser useCallback pour mémoriser la fonction
  const fetchTickets = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tickets?user_id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTickets(res.data);
    } catch (err) {
      setError('❌ Erreur lors du chargement des tickets.');
      console.error(err);
    }
  }, [token, userId]);  // Ajoutez les dépendances ici

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);  // Ajouter fetchTickets comme dépendance

  return (
    <div className="employee-ticket-list">
      <h2>📝 Mes tickets</h2>

      {error && <p className="error">{error}</p>}

      {tickets.length === 0 ? (
        <p>Aucun ticket soumis.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Créé le</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.titre}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priorite}</td>
                <td>{ticket.statut}</td>
                <td>{new Date(ticket.date_creation).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
