import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand">💻 Ticketing System</Link>
        <nav>
          <ul>
            <li><Link to="/tickets">🏠 Accueil</Link></li>
            {user && user.role === 'Employé' && <li><Link to="/create">➕ Nouveau Ticket</Link></li>}
            {user && user.role === 'Technicien' && <li><Link to="/technician">🛠 Technicien</Link></li>}
            {user && user.role === 'Admin' && <li><Link to="/admin">👑 Admin</Link></li>}
            {user ? (
              <>
                <li>👋 {user.nom}</li>
                <li><button onClick={onLogout}>Se déconnecter</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Se connecter</Link></li>
                <li><Link to="/register">S'inscrire</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
