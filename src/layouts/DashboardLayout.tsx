import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';

interface DashboardLayoutProps {
  role: 'student' | 'lecturer' | 'prodi' | 'industry' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // If user role doesn't match the required role for this layout, redirect to their dashboard
    if (user?.role !== role) {
      navigate(`/${user?.role}`);
    }
  }, [isAuthenticated, user, navigate, role]);
  
  if (!isAuthenticated || user?.role !== role) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={role} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;