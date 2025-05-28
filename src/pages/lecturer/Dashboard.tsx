import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/dashboard/StatCard';
import DashboardSection from '../../components/dashboard/DashboardSection';
import { Users, BookOpen, ClipboardCheck, Calendar } from 'lucide-react';

const LecturerDashboard: React.FC = () => {
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
        className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Sistem E-Portfolio</h1>
        <p className="opacity-90">
          Halo, {user?.name || 'Dosen'}! Monitor dan kelola progres akademik mahasiswa Anda di sini.
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
            title="Students Managed"
            value="48"
            icon={<Users className="text-blue-500" />}
            change="+5"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Active Courses"
            value="5"
            icon={<BookOpen className="text-green-500" />}
            change="+1"
            trend="up"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Pending Assessments"
            value="12"
            icon={<ClipboardCheck className="text-amber-500" />}
            change="+3"
            trend="down"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Office Hours"
            value="8"
            icon={<Calendar className="text-purple-500" />}
            change="0"
            trend="neutral"
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Submissions */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardSection title="Recent Student Submissions" icon={<ClipboardCheck size={18} />}>
            <div className="space-y-3">
              {[
                { student: 'Ahmad Rahman', course: 'Web Programming', title: 'Final Project', submitted: '2 hours ago', status: 'Pending' },
                { student: 'Siti Nurhayati', course: 'Database Design', title: 'ER Diagram', submitted: '1 day ago', status: 'Graded' },
                { student: 'Budi Santoso', course: 'Mobile App Development', title: 'UI/UX Design', submitted: '2 days ago', status: 'Pending' },
              ].map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-medium text-gray-800">{submission.title}</h4>
                    <p className="text-sm text-gray-600">{submission.student} · {submission.course}</p>
                    <p className="text-xs text-gray-500">Submitted {submission.submitted}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      submission.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      submission.status === 'Graded' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {submission.status}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>
        </motion.div>
        
        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardSection title="Today's Schedule" icon={<Calendar size={18} />}>
            <div className="space-y-3">
              {[
                { time: '09:00 - 10:30', event: 'Web Programming Lecture', location: 'Room 301' },
                { time: '11:00 - 12:30', event: 'Student Consultation', location: 'Office 205' },
                { time: '14:00 - 15:30', event: 'Department Meeting', location: 'Meeting Room A' },
              ].map((event, index) => (
                <div key={index} className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <p className="font-medium text-gray-800">{event.event}</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">{event.time}</span>
                    <span className="text-gray-500">{event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>
        </motion.div>
      </div>
      
      {/* Course Overview */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DashboardSection title="Course Overview" icon={<BookOpen size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Web Programming', students: 35, progress: 65, color: 'bg-blue-500' },
              { name: 'Database Design', students: 28, progress: 80, color: 'bg-teal-500' },
              { name: 'Mobile App Development', students: 32, progress: 45, color: 'bg-purple-500' },
              { name: 'Software Engineering', students: 25, progress: 70, color: 'bg-amber-500' },
              { name: 'Computer Networks', students: 30, progress: 60, color: 'bg-red-500' },
            ].map((course, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-800">{course.name}</h4>
                <div className="flex items-center mt-2">
                  <Users size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{course.students} students</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="mt-4 w-full py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </DashboardSection>
      </motion.div>
    </div>
  );
};

export default LecturerDashboard;