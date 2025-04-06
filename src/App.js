import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateTicket from './pages/CreateTickets';
import TicketList from './pages/TicketList';
import TechnicianDashboard from './pages/TechnicianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './pages/TechnicianDashboard';
import './App.css';
import './pages/AdminDashboard.css';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tickets" />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/technician" element={<TechnicianDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
