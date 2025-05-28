import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import LecturerDashboard from './pages/lecturer/Dashboard';
import ProdiDashboard from './pages/prodi/Dashboard';
import IndustryDashboard from './pages/industry/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './components/shared/Profile';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          
          {/* Student Routes */}
          <Route path="/student" element={<DashboardLayout role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Lecturer Routes */}
          <Route path="/lecturer" element={<DashboardLayout role="lecturer" />}>
            <Route index element={<LecturerDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Prodi Routes */}
          <Route path="/prodi" element={<DashboardLayout role="prodi" />}>
            <Route index element={<ProdiDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Industry Routes */}
          <Route path="/industry" element={<DashboardLayout role="industry" />}>
            <Route index element={<IndustryDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;