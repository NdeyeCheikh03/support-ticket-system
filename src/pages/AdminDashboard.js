import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [newUser, setNewUser] = useState({ nom: '', email: '', role: 'Employé' });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Erreur chargement stats');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (err) {
      console.error('Erreur suppression utilisateur');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>👑 Tableau de bord administrateur</h2>

      <section className="stats">
        <h3>📊 Statistiques</h3>
        <ul>
          <li>Total tickets : {stats.total}</li>
          <li>Ouverts : {stats.ouverts}</li>
          <li>Résolus : {stats.resolus}</li>
          <li>Critiques : {stats.critiques}</li>
        </ul>
      </section>

      <section className="users">
        <h3>👥 Utilisateurs</h3>
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
    </div>
  );
}
