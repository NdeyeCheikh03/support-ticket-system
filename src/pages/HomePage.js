// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Bienvenue sur la plateforme de gestion des tickets</h1>
      <p>Gérez facilement vos tickets de support IT.</p>

      <div className="home-links">
        <Link to="/tickets">Voir la liste des tickets</Link>
        <br />
        <Link to="/create">Soumettre un nouveau ticket</Link>
      </div>
    </div>
  );
}
