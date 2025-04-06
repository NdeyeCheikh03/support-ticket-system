import React, { useEffect, useState } from 'react';

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tickets?statut=Ouvert', {
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

  const updateStatus = async (id, statut) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ton_token' si besoin
        },
        body: JSON.stringify({ statut }),
      });

      if (response.ok) {
        fetchTickets(); // refresh list
      } else {
        alert('Erreur lors de la mise à jour du ticket');
      }
    } catch (err) {
      alert('Erreur de connexion');
    }
  };

  return (
    <div className="technician-dashboard">
      <h2>Tickets à traiter</h2>
      {error && <p className="error">{error}</p>}
      {tickets.length === 0 ? (
        <p>Aucun ticket à afficher.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.titre}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priorite}</td>
                <td>
                  <button onClick={() => updateStatus(ticket.id, 'En cours')}>En cours</button>
                  <button onClick={() => updateStatus(ticket.id, 'Résolu')}>Résolu</button>
                  <button onClick={() => updateStatus(ticket.id, 'Fermé')}>Fermé</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
