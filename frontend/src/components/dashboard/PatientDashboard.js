import React, { useState } from 'react';
import {
  UserIcon,
  HeartIcon,
  CalendarIcon,
  ChartBarIcon,
  PlusCircleIcon,
  BellIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ClockIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showStatDetails, setShowStatDetails] = useState(false);
  const [newPatientsCount, setNewPatientsCount] = useState(0);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    date: '',
    time: '',
    doctor: '',
    reason: '',
  });
  const [patients, setPatients] = useState([
    {
      id: 'P001',
      name: 'Luffy',
      age: 19,
      condition: 'Regular Checkup',
      status: 'Scheduled',
      avatar: '👨',
      lastVisit: '2024-04-05',
    },
    {
      id: 'P002',
      name: 'Zoro',
      age: 21,
      condition: 'Cardiac Monitoring',
      status: 'In Treatment',
      avatar: '👨',
      lastVisit: '2024-04-04',
    },
    {
      id: 'P003',
      name: 'Nami',
      age: 20,
      condition: 'Regular Checkup',
      status: 'Regular',
      avatar: '👩',
      lastVisit: '2024-04-03',
    },
    {
      id: 'P004',
      name: 'Sanji',
      age: 21,
      condition: 'Regular Checkup',
      status: 'Scheduled',
      avatar: '👨',
      lastVisit: '2024-04-02',
    },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    status: 'Scheduled',
    avatar: '👨',
  });

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: '',
    time: '',
    patientId: '',
    priority: 'medium',
    notes: '',
  });

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.condition) {
      alert('Please fill in all required fields');
      return;
    }
    const newPatientWithId = {
      ...newPatient,
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setPatients([...patients, newPatientWithId]);
    setNewPatientsCount(prev => prev + 1);
    setNewPatient({
      name: '',
      age: '',
      condition: '',
      status: 'Scheduled',
      avatar: '👨',
    });
    setShowAddPatientForm(false);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const patientStats = [
    {
      title: 'Total Patients',
      value: patients.length.toString(),
      icon: UserIcon,
      change: '+12%',
      changeType: 'increase',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      title: 'New Patients',
      value: newPatientsCount.toString(),
      icon: PlusCircleIcon,
      change: '+8%',
      changeType: 'increase',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Appointments',
      value: patients.filter(p => p.status === 'Scheduled').length.toString(),
      icon: CalendarIcon,
      change: '+24%',
      changeType: 'increase',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Critical Cases',
      value: patients.filter(p => p.condition.toLowerCase().includes('critical')).length.toString(),
      icon: HeartIcon,
      change: '-2',
      changeType: 'decrease',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  const patientVisitsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Regular Checkups',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: '#9333EA',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Emergency Visits',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        borderColor: '#EC4899',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const patientAgeDistribution = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [
      {
        label: 'Patients by Age Group',
        data: [300, 450, 320, 280, 190],
        backgroundColor: [
          '#9333EA',
          '#EC4899',
          '#F59E0B',
          '#10B981',
          '#6366F1',
        ],
      },
    ],
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setShowStatDetails(true);
  };

  const getStatDetails = (stat) => {
    switch (stat.title) {
      case 'Total Patients':
        return patients;
      case 'New Patients':
        return patients.filter(patient => {
          const lastVisit = new Date(patient.lastVisit);
          const today = new Date();
          return lastVisit.toDateString() === today.toDateString();
        });
      case 'Appointments':
        return patients.filter(patient => patient.status === 'Scheduled');
      case 'Critical Cases':
        return patients.filter(patient => patient.condition.toLowerCase().includes('critical'));
      default:
        return [];
    }
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Appointment scheduled:', appointmentForm);
    setAppointmentForm({
      patientId: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
    });
    setShowAppointmentForm(false);
  };

  const handleAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Reminder set:', reminderForm);
    setReminderForm({
      title: '',
      date: '',
      time: '',
      patientId: '',
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6 bg-purple-50"
    >
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white p-8">
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
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome to Patient Dashboard</h1>
          <p className="text-purple-100">Monitor and manage patient activities</p>
        </div>
      </div>

      {/* Add Patient Button */}
      <button
        onClick={() => setShowAddPatientForm(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <PlusCircleIcon className="h-8 w-8" />
      </button>

      {/* Add Patient Form Modal */}
      {showAddPatientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Patient</h2>
              <button
                onClick={() => setShowAddPatientForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Status</label>
                <select
                  name="status"
                  value={newPatient.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Treatment">In Treatment</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddPatientForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {patientStats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => handleStatClick(stat)}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer"
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
                <h3 className="text-sm font-medium text-gray-700">{stat.title}</h3>
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
          </div>
        ))}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Condition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getStatDetails(selectedStat).map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100">
                            <span className="text-xl">{patient.avatar}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-700">{patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.condition}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          patient.status === 'In Treatment' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Patient Visits</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <Line
            data={patientVisitsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                  },
                },
              },
              scales: {
                y: {
                  grid: {
                    display: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Age Distribution
          </h3>
          <Bar
            data={patientAgeDistribution}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  grid: {
                    display: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Recent Patients Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Recent Patients</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button 
                onClick={() => setShowAddPatientForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add Patient
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Last Visit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Diagnosis
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Next Appointment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-lg font-semibold text-gray-700 shadow-inner">
                        {patient.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-700">ID: {patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                      {patient.lastVisit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Under Treatment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <DocumentTextIcon className="h-5 w-5 text-purple-500 mr-2" />
                      {patient.condition}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <ClockIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {patient.nextAppointment || 'Not Scheduled'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{patients.length}</span> of <span className="font-medium">{patients.length}</span> results
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button 
          onClick={() => setShowAppointmentForm(true)}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-violet-500 hover:to-purple-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-violet-100 p-3 group-hover:bg-white/20">
              <CalendarIcon className="h-6 w-6 text-violet-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              Schedule Appointment
            </span>
          </div>
        </button>
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

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Schedule New Appointment</h2>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  name="patientId"
                  value={appointmentForm.patientId}
                  onChange={handleAppointmentInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleAppointmentInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={appointmentForm.time}
                  onChange={handleAppointmentInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  name="doctor"
                  value={appointmentForm.doctor}
                  onChange={handleAppointmentInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Dr. Williams">Dr. Williams</option>
                  <option value="Dr. Brown">Dr. Brown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                <textarea
                  name="reason"
                  value={appointmentForm.reason}
                  onChange={handleAppointmentInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Patient Analytics</h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Patient Demographics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Age</p>
                    <p className="text-2xl font-bold">32.5 years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender Distribution</p>
                    <div className="flex space-x-4 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">Male</p>
                        <p className="text-xl font-bold">45%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Female</p>
                        <p className="text-xl font-bold">55%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Appointment Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Wait Time</p>
                    <p className="text-2xl font-bold">15 minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">No-Show Rate</p>
                    <p className="text-2xl font-bold">8%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Treatment Outcomes</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Recovery Time</p>
                    <p className="text-2xl font-bold">14 days</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Patient Satisfaction</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="text-2xl font-bold">4.7/5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response Rate</p>
                    <p className="text-2xl font-bold">78%</p>
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
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  name="patientId"
                  value={reminderForm.patientId}
                  onChange={handleReminderInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id})
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
    </motion.div>
  );
};

export default PatientDashboard; 