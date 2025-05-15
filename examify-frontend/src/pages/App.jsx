import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './register'; // common register page
import RegisterExaminer from './registerexaminer';
import RegisterExaminee from './registerexaminee';
import Login from './login';
import LoginSelection from './LoginSelection';
import ForgotPassword from './forgot-password';
import AdminDashboard from './AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-selection" element={<LoginSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerexaminer" element={<RegisterExaminer />} />
        <Route path="/registerexaminee" element={<RegisterExaminee />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
