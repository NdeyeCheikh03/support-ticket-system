import React, { useEffect, useState, useCallback } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [newUser, setNewUser] = useState({ nom: '', email: '', role: 'Employé' });
  const [techs, setTechs] = useState([]);
  const [assignData, setAssignData] = useState({ ticketId: '', id_technicien: '' });

  const token = localStorage.getItem('token');

  // Utilisation de useCallback pour mémoriser les fonctions
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs');
    }
  }, [token]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setStats(data);
      setTechs(data.techs || []);
    } catch (err) {
      console.error('Erreur chargement stats');
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);  // Ajout des fonctions dans les dépendances de useEffect

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setNewUser({ nom: '', email: '', role: 'Employé' });
        fetchUsers();
      }
    } catch (err) {
      console.error('Erreur création utilisateur');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    try {
      await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur suppression utilisateur');
    }
  };

  const assignTechnician = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/admin/tickets/${assignData.ticketId}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_technicien: assignData.id_technicien })
      });
      if (res.ok) {
        alert('✅ Technicien assigné');
        setAssignData({ ticketId: '', id_technicien: '' });
      }
    } catch (err) {
      alert('❌ Erreur assignation');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>👑 Tableau de bord administrateur</h2>

      <section className="stats">
        <h3>📊 Statistiques</h3>
        <ul>
          <li>Total tickets : {stats.tickets_total}</li>
          <li>Ouverts : {stats.tickets_ouverts}</li>
          <li>Résolus : {stats.tickets_resolus}</li>
          <li>Critiques : {stats.tickets_critiques}</li>
        </ul>

        <h4>📈 Activité des techniciens</h4>
        <ul>
          {techs.map((t, i) => (
            <li key={i}>{t.nom} : {t.tickets} tickets</li>
          ))}
        </ul>
      </section>

      <section className="users">
        <h3>👥 Gestion des utilisateurs</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Nom"
            value={newUser.nom}
            onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="Employé">Employé</option>
            <option value="Technicien">Technicien</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Ajouter</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.nom}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => deleteUser(u.id)}>🗑 Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="assign">
        <h3>🧑‍🔧 Assigner un technicien à un ticket</h3>
        <form onSubmit={assignTechnician}>
          <input
            type="text"
            placeholder="ID du ticket"
            value={assignData.ticketId}
            onChange={(e) => setAssignData({ ...assignData, ticketId: e.target.value })}
            required
          />
          <select
            value={assignData.id_technicien}
            onChange={(e) => setAssignData({ ...assignData, id_technicien: e.target.value })}
            required
          >
            <option value="">-- Sélectionner un technicien --</option>
            {techs.map((t) => (
              <option key={t.id} value={t.id}>{t.nom}</option>
            ))}
          </select>
          <button type="submit">Assigner</button>
        </form>
      </section>
    </div>
  );
}
