import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Vous n'avez plus besoin de 'Navigate'

// Import des composants
import HomePage from './pages/HomePage';
import CreateTicket from './pages/CreateTickets';
import TicketList from './pages/TicketList';
import TechnicianDashboard from './pages/TechnicianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeTicketList from './pages/EmployeeTicketList'; 

import './App.css';
import './pages/AdminDashboard.css';

function App() {
  const [user, setUser] = useState(null);

  // Vérifier si un utilisateur est stocké dans le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">🏠 Accueil</Link>
        {user && user.role === 'Employé' && <Link to="/my-tickets">📝 Mes Tickets</Link>}
        {user && user.role === 'Technicien' && <Link to="/technician">🛠 Tickets Technicien</Link>}
        {user && user.role === 'Admin' && <Link to="/admin">👑 Admin</Link>}
        {user ? (
          <>
            <span>👋 {user.nom}</span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <>
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S'inscrire</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/technician" element={<TechnicianDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-tickets" element={<EmployeeTicketList />} />
      </Routes>
    </Router>
  );
}

export default App;
