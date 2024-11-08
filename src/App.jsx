// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import UsersPage from './pages/UsersPage';
import InstallationsPage from './pages/InstallationsPage';
import ReservationsPage from './pages/ReservationsPage';
import PaymentsPage from './pages/PaymentsPage';
import EquipmentPage from './pages/EquipmentPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
        <Navbar/>
        <div className="container mt-4">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/installations" element={<InstallationsPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
