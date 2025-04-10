import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  BellIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import Logo from '../Logo';

const navigation = [
  {
    name: 'Patient Dashboard',
    href: '/patient',
    icon: UsersIcon,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Staff Dashboard',
    href: '/staff',
    icon: UserGroupIcon,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: CalendarIcon,
    color: 'from-rose-500 to-rose-600',
  },
  {
    name: 'Patient Records',
    href: '/records',
    icon: ClipboardDocumentListIcon,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Financial Dashboard',
    href: '/finance',
    icon: CurrencyDollarIcon,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CreditCardIcon,
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    color: 'from-teal-500 to-teal-600',
  },
];

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200">
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-100 shadow-lg fixed inset-y-0 left-0 z-10"
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-20 border-b border-gray-100">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Logo />
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${ 
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <motion.div
                        className={`p-2 rounded-lg ${ 
                          isActive
                            ? 'bg-white/20'
                            : `bg-gradient-to-r ${item.color}`
                        }`}
                        whileHover={{ rotate: 5 }}
                      >
                        <item.icon
                          className={`h-5 w-5 ${ 
                            isActive ? 'text-white' : 'text-white'
                          }`}
                        />
                      </motion.div>
                      <span className={`ml-3 ${isActive ? 'text-white' : 'text-gray-700'}`}>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* User Profile */}
            <motion.div 
              className="p-4 border-t border-gray-100"
              whileHover={{ scale: 1.02 }}
            >
              <Link to="/admin" className="block">
                <div className="flex items-center group">
                  <motion.div 
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UserGroupIcon className="h-5 w-5" />
                  </motion.div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                      View Admin Dashboard
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-sm p-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Admin Dashboard'}
              </h2>
              <div className="flex items-center space-x-4">
                <motion.button 
                  className="p-1 text-gray-400 hover:text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BellIcon className="h-6 w-6" />
                </motion.button>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <button className="flex items-center space-x-2">
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <UserGroupIcon className="h-5 w-5" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-700">Admin</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.header>

          {/* Page content */}
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 flex-grow overflow-y-auto"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 