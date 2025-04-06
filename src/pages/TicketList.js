import React, { useEffect, useState } from 'react';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ton_token' si besoin
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        setError('Erreur lors du chargement des tickets');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="ticket-list">
      <h2>Liste des tickets</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Créé le</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.titre}</td>
              <td>{ticket.priorite}</td>
              <td>{ticket.statut}</td>
              <td>{new Date(ticket.date_creation).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
