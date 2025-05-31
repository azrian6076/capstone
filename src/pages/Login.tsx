import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Redirect based on user role
      if (email.includes('student')) {
        navigate('/student');
      } else if (email.includes('lecturer')) {
        navigate('/lecturer');
      } else if (email.includes('prodi')) {
        navigate('/prodi');
      } else if (email.includes('industry')) {
        navigate('/industry');
      } else if (email.includes('admin')) {
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo accounts for convenience
  const demoAccounts = [
    { role: 'mahasiswa', email: 'student@example.com', color: 'bg-blue-100 text-blue-800' },
    { role: 'dosen', email: 'lecturer@example.com', color: 'bg-green-100 text-green-800' },
    { role: 'program studi', email: 'prodi@example.com', color: 'bg-purple-100 text-purple-800' },
    { role: 'Industri', email: 'industri@example.com', color: 'bg-yellow-100 text-yellow-800' },
    { role: 'Admin', email: 'admin@example.com', color: 'bg-red-100 text-red-800' }
  ];

  const setDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In to Your Account</h2>
      
      {error && (
        <motion.div 
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="gmail@email.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Demo Accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {demoAccounts.map((account) => (
            <button
              key={account.role}
              onClick={() => setDemoAccount(account.email)}
              className={`py-1 px-2 rounded-md ${account.color} text-left transition hover:opacity-80`}
            >
              <span className="font-medium">{account.role}:</span> {account.email}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">Password for all demo accounts: password123</p>
      </div>
    </div>
  );
};

export default Login;