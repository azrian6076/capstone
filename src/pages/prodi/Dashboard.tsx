import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import { Users, BookMarked, FileText, Award, BookOpen } from 'lucide-react';

const ProdiDashboard: React.FC = () => {
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="h-full">
      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Sistem E-Portfolio</h1>
        <p className="opacity-90">
          Halo, {user?.name || 'Admin Program Studi'}! Pantau kemajuan program studi dan kelola kurikulum dari dasbor ini.
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Students"
            value="250"
            icon={<Users className="text-blue-500" />}
            change="+15"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Active Courses"
            value="18"
            icon={<BookOpen className="text-green-500" />}
            change="+2"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Faculty Members"
            value="25"
            icon={<Users className="text-purple-500" />}
            change="+3"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Graduation Rate"
            value="92%"
            icon={<Award className="text-amber-500" />}
            change="+4%"
            trend="up"
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Performance Overview */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardSection title="Student Performance Overview" icon={<Users size={18} />}>
            <div className="space-y-5">
              {[
                { year: '1st Year', avgGPA: 3.4, retention: '95%', passingRate: '90%' },
                { year: '2nd Year', avgGPA: 3.5, retention: '92%', passingRate: '88%' },
                { year: '3rd Year', avgGPA: 3.6, retention: '90%', passingRate: '92%' },
                { year: '4th Year', avgGPA: 3.7, retention: '88%', passingRate: '94%' },
              ].map((yearData, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{yearData.year} Students</h3>
                    <div className="text-sm text-gray-500">Avg. GPA: <span className="font-medium text-gray-800">{yearData.avgGPA}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Retention Rate</span>
                        <span className="font-medium">{yearData.retention}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: yearData.retention }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Passing Rate</span>
                        <span className="font-medium">{yearData.passingRate}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: yearData.passingRate }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>
        </motion.div>
        
        {/* Department Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardSection title="Recent Updates" icon={<FileText size={18} />}>
            <div className="space-y-3">
              {[
                { type: 'curriculum', title: 'Curriculum Update Approved', date: '2 days ago' },
                { type: 'faculty', title: 'New Faculty Member Joined', date: '1 week ago' },
                { type: 'report', title: 'Annual Review Completed', date: '2 weeks ago' },
                { type: 'event', title: 'Academic Calendar Updated', date: '3 weeks ago' },
              ].map((update, index) => (
                <div key={index} className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <p className="font-medium text-gray-800">{update.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{update.date}</p>
                </div>
              ))}
              <button className="text-sm text-purple-600 hover:text-purple-800 mt-2">
                View all updates
              </button>
            </div>
          </DashboardSection>
        </motion.div>
      </div>
      
      {/* Curriculum Management */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DashboardSection title="Curriculum Management" icon={<BookMarked size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Web Development Track', status: 'Active', lastUpdated: 'Oct 2025', courses: 8 },
              { name: 'Mobile Development Track', status: 'Review', lastUpdated: 'Sep 2025', courses: 6 },
              { name: 'Data Science Specialization', status: 'Active', lastUpdated: 'Aug 2025', courses: 10 },
              { name: 'AI & Machine Learning', status: 'Draft', lastUpdated: 'Oct 2025', courses: 7 },
              { name: 'Cybersecurity Program', status: 'Active', lastUpdated: 'Jul 2025', courses: 9 },
              { name: 'IoT Specialization', status: 'Planned', lastUpdated: 'N/A', courses: 5 },
            ].map((curriculum, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800">{curriculum.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    curriculum.status === 'Active' ? 'bg-green-500' :
                    curriculum.status === 'Review' ? 'bg-amber-500' :
                    curriculum.status === 'Draft' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></span>
                  <span className="text-sm text-gray-600">{curriculum.status}</span>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Courses:</span>
                    <span className="font-medium">{curriculum.courses}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Last Updated:</span>
                    <span className="font-medium">{curriculum.lastUpdated}</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-1.5 text-sm text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </DashboardSection>
      </motion.div>
    </div>
  );
};

export default ProdiDashboard;