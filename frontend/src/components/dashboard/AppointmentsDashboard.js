import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusCircleIcon,
  BellIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentsDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('upcoming');
  const [showAddAppointmentForm, setShowAddAppointmentForm] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 'APT001',
      patientName: 'Luffy',
      type: 'General Checkup',
      doctor: 'Dr. Vasumathi',
      time: '09:30 AM',
      date: '2024-04-05',
      status: 'Confirmed',
      avatar: '👨',
    },
    {
      id: 'APT002',
      patientName: 'Zoro',
      type: 'Cardiac Monitoring',
      doctor: 'Dr. Sathya',
      time: '10:45 AM',
      date: '2024-04-05',
      status: 'Pending',
      avatar: '👨',
    },
    {
      id: 'APT003',
      patientName: 'Nami',
      type: 'Follow-up',
      doctor: 'Nurse Srijaa Prabhu',
      time: '02:15 PM',
      date: '2024-04-05',
      status: 'Confirmed',
      avatar: '👩',
    },
    {
      id: 'APT004',
      patientName: 'Sanji',
      type: 'Neurology Consultation',
      doctor: 'Dr. Harry Potter',
      time: '03:30 PM',
      date: '2024-04-05',
      status: 'Rescheduled',
      avatar: '👨',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    type: 'General Checkup',
    doctor: '',
    time: '',
    date: '',
    status: 'Pending',
  });

  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointmentForReschedule, setSelectedAppointmentForReschedule] = useState(null);
  const [reminderForm, setReminderForm] = useState({
    patientName: '',
    message: '',
    date: '',
    time: '',
  });

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointmentWithId = {
      ...newAppointment,
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      avatar: '👨',
    };
    setAppointments([...appointments, newAppointmentWithId]);
    setNewAppointment({
      patientName: '',
      type: 'General Checkup',
      doctor: '',
      time: '',
      date: '',
      status: 'Pending',
    });
    setShowAddAppointmentForm(false);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatCardClick = (stat) => {
    let filteredAppointments = [];
    
    switch (stat.title) {
      case 'Total Appointments':
        filteredAppointments = appointments;
        break;
      case 'Today\'s Appointments':
        filteredAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
        break;
      case 'Patients Seen':
        filteredAppointments = appointments.filter(a => a.status === 'Completed');
        break;
      case 'Completion Rate':
        filteredAppointments = appointments.filter(a => a.status === 'Completed');
        break;
      default:
        filteredAppointments = appointments;
    }

    setSelectedAppointment({
      ...stat,
      appointments: filteredAppointments
    });
    setShowAppointmentDetails(true);
  };

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the reminder via email or SMS
    alert(`Reminder sent to ${reminderForm.patientName}`);
    setReminderForm({
      patientName: '',
      message: '',
      date: '',
      time: '',
    });
    setShowReminderModal(false);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (selectedAppointmentForReschedule) {
      const updatedAppointments = appointments.map(appointment => {
        if (appointment.id === selectedAppointmentForReschedule.id) {
          return {
            ...appointment,
            date: selectedAppointmentForReschedule.date,
            time: selectedAppointmentForReschedule.time,
            status: 'Rescheduled',
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setShowRescheduleModal(false);
      setSelectedAppointmentForReschedule(null);
    }
  };

  const appointmentStats = [
    {
      title: 'Total Appointments',
      value: appointments.length.toString(),
      icon: CalendarIcon,
      change: '+12%',
      changeType: 'increase',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Today\'s Appointments',
      value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(),
      icon: ClockIcon,
      change: '+4',
      changeType: 'increase',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Patients Seen',
      value: appointments.filter(a => a.status === 'Completed').length.toString(),
      icon: UserGroupIcon,
      change: '+15%',
      changeType: 'increase',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Completion Rate',
      value: `${Math.round((appointments.filter(a => a.status === 'Completed').length / appointments.length) * 100)}%`,
      icon: CheckCircleIcon,
      change: '+2%',
      changeType: 'increase',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  const appointmentTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scheduled',
        data: [25, 30, 28, 32, 26, 18, 15],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366F1',
        tension: 0.4,
      },
      {
        label: 'Completed',
        data: [22, 28, 25, 30, 24, 16, 13],
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10B981',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6 p-6 bg-purple-50">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8">
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
          <h1 className="text-3xl font-bold mb-2">Appointment Management</h1>
          <p className="text-blue-100">Schedule and manage patient appointments</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {appointmentStats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => handleStatCardClick(stat)}
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
          </div>
        ))}
      </div>

      {/* Calendar and Appointments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Calendar
            </h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full border-0 rounded-lg"
            />
            <div className="mt-6 space-y-4">
              <button
                onClick={() => setShowAddAppointmentForm(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                New Appointment
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Refresh Calendar
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Appointments</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{appointment.avatar}</span>
                          <div>
                            <div className="font-medium text-gray-900">{appointment.patientName}</div>
                            <div className="text-sm text-gray-500">{appointment.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            appointment.status === 'Confirmed'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowAppointmentDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <PencilIcon className="h-5 w-5" />
                          </button>
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Trends */}
      <div className="rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Appointment Trends</h3>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>
              Scheduled
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
              Completed
            </span>
          </div>
        </div>
        <div className="h-40">
        <Line
          data={appointmentTrendData}
          options={{
            responsive: true,
              maintainAspectRatio: false,
            plugins: {
              legend: {
                  display: false,
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  titleColor: '#1F2937',
                  bodyColor: '#4B5563',
                  borderColor: '#E5E7EB',
                  borderWidth: 1,
                  padding: 10,
                  boxPadding: 4,
                  usePointStyle: true,
                  callbacks: {
                    label: function(context) {
                      return `${context.dataset.label}: ${context.parsed.y} appointments`;
                    }
                  }
                }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                    color: 'rgba(229, 231, 235, 0.5)',
                  },
                  ticks: {
                    maxTicksLimit: 5,
                    font: {
                      size: 10,
                    },
                    color: '#6B7280',
                  },
              },
              x: {
                grid: {
                  display: false,
                  },
                  ticks: {
                    font: {
                      size: 10,
                    },
                    color: '#6B7280',
                  },
                },
              },
              elements: {
                point: {
                  radius: 4,
                  hoverRadius: 6,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                },
                line: {
                  tension: 0.4,
                  borderWidth: 2,
                },
              },
              interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false,
            },
          }}
        />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button 
          onClick={() => setShowAddAppointmentForm(true)}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-3 group-hover:bg-white/20">
              <CalendarIcon className="h-6 w-6 text-blue-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              Schedule Appointment
            </span>
          </div>
        </button>
        <button 
          onClick={() => setShowReminderModal(true)}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-rose-100 p-3 group-hover:bg-white/20">
              <BellIcon className="h-6 w-6 text-rose-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              Send Reminders
            </span>
          </div>
        </button>
        <button 
          onClick={() => {
            if (appointments.length > 0) {
              setSelectedAppointmentForReschedule(appointments[0]);
              setShowRescheduleModal(true);
            }
          }}
          className="group rounded-2xl bg-white p-6 shadow-lg hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 transition-all"
        >
          <div className="flex items-center">
            <div className="rounded-lg bg-amber-100 p-3 group-hover:bg-white/20">
              <ArrowPathIcon className="h-6 w-6 text-amber-600 group-hover:text-white" />
            </div>
            <span className="ml-4 font-semibold text-gray-900 group-hover:text-white">
              Reschedule
            </span>
          </div>
        </button>
      </div>

      {/* Add Appointment Form Modal */}
      {showAddAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">New Appointment</h2>
              <button
                onClick={() => setShowAddAppointmentForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={newAppointment.patientName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
                <select
                  name="type"
                  value={newAppointment.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="General Checkup">General Checkup</option>
                  <option value="Cardiac Monitoring">Cardiac Monitoring</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Neurology Consultation">Neurology Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  name="doctor"
                  value={newAppointment.doctor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Doctor</option>
                  <option value="Dr. Vasumathi">Dr. Vasumathi</option>
                  <option value="Dr. Sathya">Dr. Sathya</option>
                  <option value="Nurse Srijaa Prabhu">Nurse Srijaa Prabhu</option>
                  <option value="Dr. Harry Potter">Dr. Harry Potter</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAppointmentForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showAppointmentDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedAppointment.title}</h2>
              <button
                onClick={() => setShowAppointmentDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-lg p-3 bg-gradient-to-br ${selectedAppointment.gradient}`}>
                    <selectedAppointment.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedAppointment.value}</h3>
                    <p className="text-sm text-gray-500">{selectedAppointment.change}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedAppointment.appointments?.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{appointment.avatar}</span>
                              <div>
                                <div className="font-medium text-gray-900">{appointment.patientName}</div>
                                <div className="text-sm text-gray-500">{appointment.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.doctor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                appointment.status === 'Confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : appointment.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Send Reminder</h2>
              <button
                onClick={() => setShowReminderModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleReminderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <select
                  name="patientName"
                  value={reminderForm.patientName}
                  onChange={(e) => setReminderForm({...reminderForm, patientName: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Patient</option>
                  {appointments.map(appointment => (
                    <option key={appointment.id} value={appointment.patientName}>
                      {appointment.patientName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={reminderForm.message}
                  onChange={(e) => setReminderForm({...reminderForm, message: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({...reminderForm, date: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({...reminderForm, time: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700"
                >
                  Send Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointmentForReschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Reschedule Appointment</h2>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <p className="mt-1 text-lg font-semibold">{selectedAppointmentForReschedule.patientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Appointment</label>
                <p className="mt-1 text-lg font-semibold">
                  {selectedAppointmentForReschedule.date} at {selectedAppointmentForReschedule.time}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Date</label>
                  <input
                    type="date"
                    value={selectedAppointmentForReschedule.date}
                    onChange={(e) => setSelectedAppointmentForReschedule({
                      ...selectedAppointmentForReschedule,
                      date: e.target.value
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Time</label>
                  <input
                    type="time"
                    value={selectedAppointmentForReschedule.time}
                    onChange={(e) => setSelectedAppointmentForReschedule({
                      ...selectedAppointmentForReschedule,
                      time: e.target.value
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsDashboard; 