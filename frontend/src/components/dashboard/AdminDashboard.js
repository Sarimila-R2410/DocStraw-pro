import React, { useState } from 'react';
import {
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BellIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const adminStats = [
    {
      title: 'Total Users',
      value: '156',
      change: '+12%',
      icon: <UserGroupIcon className="h-6 w-6" />,
      bgColor: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Active Staff',
      value: '42',
      change: '+5%',
      icon: <UserCircleIcon className="h-6 w-6" />,
      bgColor: 'from-rose-500 to-pink-600',
    },
    {
      title: 'System Health',
      value: '98%',
      change: '+2%',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      bgColor: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Total Revenue',
      value: '₹85,245',
      change: '+8%',
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      bgColor: 'from-blue-500 to-indigo-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Dr. Vasumathi',
      action: 'Updated patient records',
      timestamp: '2 minutes ago',
      icon: <DocumentTextIcon className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 2,
      user: 'Dr. Sathya',
      action: 'Added new appointment',
      timestamp: '15 minutes ago',
      icon: <BellIcon className="h-5 w-5 text-blue-600" />,
    },
    {
      id: 3,
      user: 'Nurse Srijaa Prabhu',
      action: 'Updated staff schedule',
      timestamp: '1 hour ago',
      icon: <Cog6ToothIcon className="h-5 w-5 text-emerald-600" />,
    },
    {
      id: 4,
      user: 'Dr. Harry Potter',
      action: 'Generated monthly report',
      timestamp: '2 hours ago',
      icon: <ChartBarIcon className="h-5 w-5 text-rose-600" />,
    },
  ];

  const quickActions = [
    {
      title: 'User Management',
      icon: <UserGroupIcon className="h-6 w-6" />,
      bgColor: 'from-violet-500 to-purple-600',
    },
    {
      title: 'System Settings',
      icon: <Cog6ToothIcon className="h-6 w-6" />,
      bgColor: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Reports',
      icon: <ChartBarIcon className="h-6 w-6" />,
      bgColor: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Security',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      bgColor: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-purple-50">
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">Manage your hospital system settings and monitor activities</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-lg p-3 bg-gradient-to-r ${stat.bgColor}`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-105"
          >
            <div className="p-6">
              <div className={`rounded-lg p-3 bg-gradient-to-r ${action.bgColor} mb-4 inline-block`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg p-2 bg-gray-100">{activity.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 