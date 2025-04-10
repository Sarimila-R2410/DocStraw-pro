import React, { useState } from 'react';
import {
  UserIcon,
  ClockIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ChartBarIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import StaffProfileModal from './StaffProfileModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mapping for department icons
const departmentIcons = {
  'Cardiology': '❤️',
  'Orthopedics': '🦴',
  'Pediatrics': '👶',
  'Neurology': '🧠',
  'Radiology': '☢️', // Or perhaps 📸
  'Oncology': '🎗️',
  'Emergency': '🚨'
};

// Define the custom plugin to draw labels inside slices
const pieChartLabelsPlugin = {
  id: 'pieChartLabels',
  afterDraw(chart, args, options) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) { // Only draw for visible datasets
        meta.data.forEach((element, index) => {
          const label = chart.data.labels[index];
          const icon = departmentIcons[label];
          
          // Only draw if the slice is large enough and we have an icon
          if (icon && element.circumference > 0.1) { // Threshold to avoid drawing on tiny slices
            const { x, y } = element.getCenterPoint();
            
            // Style and draw the icon
            ctx.save();
            ctx.font = 'bold 16px Arial'; // Adjust size as needed
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'; // Icon color
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Optional: slightly offset based on angle if needed, but center usually works for emojis
            ctx.fillText(icon, x, y);
            ctx.restore();
          }
        });
      }
    });
  }
};

const StaffDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showStatDetails, setShowStatDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [newStaffCount, setNewStaffCount] = useState(0);
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 'S001',
      name: 'Dr.Vasumathi',
      role: 'Senior Doctor',
      department: 'Cardiology',
      status: 'Active',
      experience: '15 years',
      email: 'dr.vasumathi@hospital.com',
      avatar: '👩‍⚕️',
    },
    {
      id: 'S002',
      name: 'Dr.Shankar',
      role: 'Surgeon',
      department: 'Orthopedics',
      status: 'Active',
      experience: '12 years',
      email: 'dr.shankar@hospital.com',
      avatar: '👨‍⚕️',
    },
    {
      id: 'S003',
      name: 'Nurse Srijaa',
      role: 'Nurse',
      department: 'Pediatrics',
      status: 'Active',
      experience: '8 years',
      email: 'nurse.srijaa@hospital.com',
      avatar: '👩‍⚕️',
    },
    {
      id: 'S004',
      name: 'Dr.Theanesh',
      role: 'Neurologist',
      department: 'Neurology',
      status: 'Active',
      experience: '10 years',
      email: 'dr.theanesh@hospital.com',
      avatar: '👨‍⚕️',
    },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: '',
    status: 'Active',
    experience: '',
    email: '',
    avatar: '👨‍⚕️',
  });

  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: '',
    time: '',
    staffId: '',
    priority: 'medium',
    notes: '',
  });

  // State for profile modal
  const [selectedStaffProfile, setSelectedStaffProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaffWithId = {
      ...newStaff,
      id: `S${String(staffMembers.length + 1).padStart(3, '0')}`,
    };
    setStaffMembers([...staffMembers, newStaffWithId]);
    setNewStaffCount(prev => prev + 1);
    setNewStaff({
      name: '',
      role: '',
      department: '',
      status: 'Active',
      experience: '',
      email: '',
      avatar: '👨‍⚕️',
    });
    setShowAddStaffForm(false);
  };

  const handleDeleteStaff = (id) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setShowStatDetails(true);
  };

  const getStatDetails = (stat) => {
    switch (stat.title) {
      case 'Total Staff':
        return staffMembers;
      case 'Active Staff Today':
        return staffMembers.filter(staff => staff.status === 'Active');
      case 'Departments':
        return staffMembers;
      case 'Training Programs':
        return staffMembers.filter(staff => staff.experience < '5 years');
      default:
        return [];
    }
  };

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    console.log('Reminder set:', reminderForm);
    setReminderForm({
      title: '',
      date: '',
      time: '',
      staffId: '',
      priority: 'medium',
      notes: '',
    });
    setShowReminders(false);
  };

  const handleReminderInputChange = (e) => {
    const { name, value } = e.target;
    setReminderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to open profile modal
  const handleOpenProfileModal = (staff) => {
    setSelectedStaffProfile(staff);
    setIsProfileModalOpen(true);
  };

  // Handler to close profile modal
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    // Delay clearing selected staff to allow modal animation to finish
    setTimeout(() => setSelectedStaffProfile(null), 300); 
  };

  const staffStats = [
    {
      title: 'Total Staff',
      value: staffMembers.length.toString(),
      icon: UserIcon,
      change: '+12%',
      changeType: 'increase',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Active Staff Today',
      value: staffMembers.filter(s => s.status === 'Active').length.toString(),
      icon: ClockIcon,
      change: '+8%',
      changeType: 'increase',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Departments',
      value: new Set(staffMembers.map(s => s.department)).size.toString(),
      icon: BuildingOfficeIcon,
      change: '+2',
      changeType: 'increase',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Training Programs',
      value: staffMembers.filter(s => parseInt(s.experience) < 5).length.toString(),
      icon: AcademicCapIcon,
      change: '+3',
      changeType: 'increase',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  // Add chart data
  const departmentDistributionData = {
    labels: ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Radiology', 'Oncology', 'Emergency'],
    datasets: [
      {
        data: [4, 3, 2, 2, 3, 2, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(100, 100, 100, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(100, 100, 100, 1)'
        ],
        borderWidth: 1
      },
    ],
  };

  const experienceTrendData = {
    labels: ['0-5 years', '5-10 years', '10-15 years', '15+ years'],
    datasets: [
      {
        label: 'Staff Count',
        data: [2, 3, 1, 2],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)', // Teal
          'rgba(54, 162, 235, 0.8)', // Blue
          'rgba(255, 206, 86, 0.8)', // Yellow
          'rgba(153, 102, 255, 0.8)'  // Purple
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
        borderRadius: 8, 
        hoverBackgroundColor: [
          'rgba(95, 212, 212, 0.9)',
          'rgba(74, 182, 255, 0.9)',
          'rgba(255, 216, 106, 0.9)',
          'rgba(173, 122, 255, 0.9)'
        ],
        hoverBorderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 p-6 bg-purple-50"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white p-8"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16">
          <svg
            className="w-64 h-64 opacity-20"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M45,-78.1C58.3,-71.3,69.1,-58.9,75.9,-44.6C82.7,-30.3,85.5,-14.1,83.8,1.7C82.1,17.5,76,33.1,66.7,46.5C57.4,59.9,45,71.1,30.7,76.3C16.3,81.5,0.1,80.7,-15.8,76.7C-31.7,72.7,-47.2,65.4,-58.6,53.7C-70,42,-77.2,25.9,-79.4,8.9C-81.6,-8.1,-78.8,-26,-69.9,-39.4C-61,-52.8,-46,-61.7,-32.1,-68.5C-18.2,-75.2,-5.4,-79.8,9.2,-79.8C23.8,-79.8,47.6,-75.2,45,-78.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">Welcome to Staff Dashboard</h1>
          <p className="text-purple-100">Monitor and manage staff activities</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {staffStats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick(stat)}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg cursor-pointer"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${stat.gradient} opacity-10`}
            ></div>
            <div className="flex items-center">
              <div
                className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${stat.gradient}`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p
                    className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Staff Table & Charts Section */}
      {/* Make Staff Table full width on large screens */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6 mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Staff Members ({staffMembers.length})</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddStaffForm(true)}
            className="flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
            <PlusCircleIcon className="h-4 w-4 mr-1" />
              Add Staff
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffMembers.map((staff) => (
                <motion.tr 
                  key={staff.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenProfileModal(staff)}
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                  transition={{ duration: 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-xl mr-2">{staff.avatar || '👤'}</div>
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <motion.button 
                      onClick={(e) => { e.stopPropagation(); /* TODO: Implement Edit */ alert('Edit: ' + staff.name); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100"
                    >
                       <PencilIcon className="h-4 w-4" />
                    </motion.button>
                    <motion.button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteStaff(staff.id); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100"
                     >
                       <TrashIcon className="h-4 w-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> 
        {/* Department Distribution Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="h-80">
            <Pie
              data={departmentDistributionData}
              plugins={[pieChartLabelsPlugin]}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: { 
                      padding: 15,
                      boxWidth: 15,
                      font: { size: 12 },
                      generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return chart.data.labels.map((label, i) => {
                          const meta = chart.getDatasetMeta(0);
                          const style = meta.controller.getStyle(i);
                          return {
                            text: label,
                            fillStyle: style.backgroundColor,
                            strokeStyle: style.borderColor,
                            lineWidth: style.borderWidth,
                            hidden: !chart.getDataVisibility(i),
                            index: i
                          };
                        });
                      }
                    }
                  },
                  tooltip: {
                    callbacks: {
                       title: (tooltipItems) => {
                          return tooltipItems[0].label;
                       },
                       label: (tooltipItem) => {
                          let value = tooltipItem.formattedValue;
                          return ` Staff: ${value}`;
                       }
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>

        {/* Experience Trend Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Distribution</h3>
          <div className="h-80">
            <Bar
              data={experienceTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += context.parsed.y + ' staff';
                        }
                        return label;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(200, 200, 200, 0.2)',
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Stat Details Modal */}
      {showStatDetails && selectedStat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedStat.title} Details</h2>
              <button
                onClick={() => setShowStatDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getStatDetails(selectedStat).map((staff) => (
                    <tr key={staff.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100">
                            <span className="text-xl">{staff.avatar}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                            <div className="text-sm text-gray-500">{staff.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          staff.status === 'Active' ? 'bg-green-100 text-green-800' :
                          staff.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button 
          onClick={() => setShowAnalytics(true)}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-pink-100 p-3 group-hover:bg-white/20">
              <ChartBarIcon className="h-6 w-6 text-pink-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              View Analytics
            </span>
          </div>
        </button>
        <button 
          onClick={() => setShowReminders(true)}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-amber-100 p-3 group-hover:bg-white/20">
              <BellIcon className="h-6 w-6 text-amber-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              Set Reminders
            </span>
          </div>
        </button>
      </div>

      {/* Add Staff Form Modal */}
      {showAddStaffForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Add New Staff</h2>
              <button
                onClick={() => setShowAddStaffForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newStaff.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  value={newStaff.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newStaff.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={newStaff.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newStaff.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Staff Analytics</h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Staff Demographics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Experience</p>
                    <p className="text-2xl font-bold text-gray-900">11.25 years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department Distribution</p>
                    <div className="space-y-2 mt-2">
                      {Array.from(new Set(staffMembers.map(s => s.department))).map(dept => (
                        <div key={dept} className="flex justify-between">
                          <p className="text-sm text-gray-500">{dept}</p>
                          <p className="text-sm font-bold text-gray-900">
                            {staffMembers.filter(s => s.department === dept).length}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Staff Performance</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Active Staff Rate</p>
                    <p className="text-2xl font-bold text-gray-900">75%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Training Needs</p>
                    <p className="text-2xl font-bold text-gray-900">25%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Department Efficiency</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Patient Load</p>
                    <p className="text-2xl font-bold text-gray-900">45 patients/day</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">15 minutes</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Staff Satisfaction</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">4.5/5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Retention Rate</p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Modal */}
      {showReminders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Set New Reminder</h2>
              <button
                onClick={() => setShowReminders(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleReminderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={reminderForm.title}
                  onChange={handleReminderInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff</label>
                <select
                  name="staffId"
                  value={reminderForm.staffId}
                  onChange={handleReminderInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Staff</option>
                  {staffMembers.map(staff => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={reminderForm.date}
                    onChange={handleReminderInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={reminderForm.time}
                    onChange={handleReminderInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={reminderForm.priority}
                  onChange={handleReminderInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={reminderForm.notes}
                  onChange={handleReminderInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReminders(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700"
                >
                  Set Reminder
                </button>
              </div>
            </form>
      </div>
    </div>
      )}

      {/* Staff Profile Modal - Conditional Rendering */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <StaffProfileModal 
            staff={selectedStaffProfile} 
            onClose={handleCloseProfileModal} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StaffDashboard; 