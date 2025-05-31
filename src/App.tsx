import React from 'react';
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
import Project from './pages/student/project';
import Certification from './pages/student/certification';
import Activity from './pages/student/activity';
import { StudentDataProvider } from './contexts/StudentDataContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route path="/student" element={<DashboardLayout role="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="project" element={<Project />} />
            <Route path="certification" element={<Certification />} />
            <Route path="activity" element={<Activity />} />
          </Route>
          <Route path="/lecturer" element={<DashboardLayout role="lecturer" />}>
            <Route index element={<LecturerDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/prodi" element={<DashboardLayout role="prodi" />}>
            <Route index element={<ProdiDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/industry" element={<DashboardLayout role="industry" />}>
            <Route index element={<IndustryDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;