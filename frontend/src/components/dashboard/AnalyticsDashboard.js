import React, { useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Sample data for analytics
  const analyticsData = {
    patientStats: {
      totalPatients: 1250,
      newPatients: 45,
      activePatients: 980,
      inactivePatients: 270,
      trend: 'up',
      percentage: 12.5,
    },
    appointmentStats: {
      totalAppointments: 320,
      completed: 280,
      cancelled: 25,
      noShows: 15,
      trend: 'up',
      percentage: 8.3,
    },
    revenueStats: {
      totalRevenue: 1250000,
      averageRevenue: 45000,
      highestRevenue: 65000,
      lowestRevenue: 32000,
      trend: 'up',
      percentage: 15.2,
    },
    departmentStats: {
      cardiology: 320,
      neurology: 280,
      pediatrics: 250,
      orthopedics: 200,
      others: 200,
    },
  };

  // Chart data
  const patientTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 48000, 52000, 58000, 62000, 65000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const departmentData = {
    labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Others'],
    datasets: [
      {
        data: [320, 280, 250, 200, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50">
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
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-blue-100">Monitor and analyze healthcare metrics</p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'week'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'month'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === 'year'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Year
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-white hover:bg-gray-100">
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-gray-600">April 2024</span>
          <button className="p-2 rounded-lg bg-white hover:bg-gray-100">
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Patient Stats */}
        <div
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('patients')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span
              className={`flex items-center text-sm ${
                analyticsData.patientStats.trend === 'up'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {analyticsData.patientStats.trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              {analyticsData.patientStats.percentage}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {analyticsData.patientStats.totalPatients}
          </h3>
          <p className="text-gray-500">Total Patients</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New Patients</span>
              <span className="font-medium">{analyticsData.patientStats.newPatients}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Active Patients</span>
              <span className="font-medium">{analyticsData.patientStats.activePatients}</span>
            </div>
          </div>
        </div>

        {/* Appointment Stats */}
        <div
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('appointments')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
            <span
              className={`flex items-center text-sm ${
                analyticsData.appointmentStats.trend === 'up'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {analyticsData.appointmentStats.trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              {analyticsData.appointmentStats.percentage}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {analyticsData.appointmentStats.totalAppointments}
          </h3>
          <p className="text-gray-500">Total Appointments</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Completed</span>
              <span className="font-medium">{analyticsData.appointmentStats.completed}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Cancelled</span>
              <span className="font-medium">{analyticsData.appointmentStats.cancelled}</span>
            </div>
          </div>
        </div>

        {/* Revenue Stats */}
        <div
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('revenue')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <span
              className={`flex items-center text-sm ${
                analyticsData.revenueStats.trend === 'up'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {analyticsData.revenueStats.trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              {analyticsData.revenueStats.percentage}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            ₹{analyticsData.revenueStats.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-gray-500">Total Revenue</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Average</span>
              <span className="font-medium">₹{analyticsData.revenueStats.averageRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Highest</span>
              <span className="font-medium">₹{analyticsData.revenueStats.highestRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Department Stats */}
        <div
          className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('departments')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {Object.values(analyticsData.departmentStats).reduce((a, b) => a + b, 0)}
          </h3>
          <p className="text-gray-500">Total Department Visits</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Cardiology</span>
              <span className="font-medium">{analyticsData.departmentStats.cardiology}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Neurology</span>
              <span className="font-medium">{analyticsData.departmentStats.neurology}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trend Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Growth Trend</h3>
          <div className="h-80">
            <Line
              data={patientTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h3>
          <div className="h-80">
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="h-80">
            <Pie
              data={departmentData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Average Wait Time</p>
                  <p className="text-lg font-semibold">15 minutes</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">-5% from last month</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Patient Satisfaction</p>
                  <p className="text-lg font-semibold">94%</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">+2% from last month</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Appointment Utilization</p>
                  <p className="text-lg font-semibold">87%</p>
                </div>
              </div>
              <span className="text-green-600 text-sm">+3% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 