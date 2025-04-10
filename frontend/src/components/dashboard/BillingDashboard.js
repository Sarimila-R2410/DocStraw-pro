import React, { useState } from 'react';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  ChartBarIcon,
  BellIcon,
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ChartPieIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const BillingDashboard = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const billingStats = [
    {
      name: 'Total Billing',
      value: '₹45,231',
      change: '+20.1%',
      icon: CurrencyDollarIcon,
      details: {
        title: 'Billing Breakdown',
        data: [
          { label: 'Consultations', value: '₹15,000', percentage: '33%' },
          { label: 'Procedures', value: '₹20,000', percentage: '44%' },
          { label: 'Medications', value: '₹8,000', percentage: '18%' },
          { label: 'Other', value: '₹2,231', percentage: '5%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [35000, 40000, 42000, 45231],
        },
      },
    },
    {
      name: 'Pending Payments',
      value: '₹12,450',
      change: '-5.2%',
      icon: CreditCardIcon,
      details: {
        title: 'Pending Payments',
        data: [
          { label: 'Overdue', value: '₹6,000', percentage: '48%' },
          { label: 'Due This Week', value: '₹3,000', percentage: '24%' },
          { label: 'Due Next Week', value: '₹2,000', percentage: '16%' },
          { label: 'Other', value: '₹1,450', percentage: '12%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [15000, 14000, 13000, 12450],
        },
      },
    },
    {
      name: 'Insurance Claims',
      value: '₹32,781',
      change: '+25.3%',
      icon: ShieldCheckIcon,
      details: {
        title: 'Insurance Claims',
        data: [
          { label: 'Approved', value: '₹25,000', percentage: '76%' },
          { label: 'Pending', value: '₹5,000', percentage: '15%' },
          { label: 'Rejected', value: '₹2,781', percentage: '9%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [25000, 28000, 30000, 32781],
        },
      },
    },
    {
      name: 'Collection Rate',
      value: '92.5%',
      change: '+3.1%',
      icon: ChartPieIcon,
      details: {
        title: 'Collection Analysis',
        data: [
          { label: 'Current Rate', value: '92.5%', percentage: '92.5%' },
          { label: 'Industry Average', value: '85%', percentage: '85%' },
          { label: 'Target Rate', value: '95%', percentage: '95%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [85, 88, 90, 92.5],
        },
      },
    },
  ];

  const recentBills = [
    {
      id: 'B001',
      patient: 'John Doe',
      date: '2024-04-05',
      amount: '₹2,500',
      status: 'Paid',
      insurance: 'Yes',
    },
    {
      id: 'B002',
      patient: 'Jane Smith',
      date: '2024-04-04',
      amount: '₹1,800',
      status: 'Pending',
      insurance: 'Yes',
    },
    {
      id: 'B003',
      patient: 'Robert Johnson',
      date: '2024-04-03',
      amount: '₹3,200',
      status: 'Overdue',
      insurance: 'No',
    },
  ];

  const insuranceClaims = [
    {
      id: 'IC001',
      patient: 'John Doe',
      provider: 'HealthCare Plus',
      amount: '₹2,000',
      status: 'Approved',
      date: '2024-04-05',
    },
    {
      id: 'IC002',
      patient: 'Jane Smith',
      provider: 'MediCare',
      amount: '₹1,500',
      status: 'Pending',
      date: '2024-04-04',
    },
    {
      id: 'IC003',
      patient: 'Robert Johnson',
      provider: 'HealthGuard',
      amount: '₹3,000',
      status: 'Rejected',
      date: '2024-04-03',
    },
  ];

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
      className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen"
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
          <h1 className="text-3xl font-bold mb-2">Billing & Insurance Dashboard</h1>
          <p className="text-purple-100">Manage billing, payments, and insurance claims</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {billingStats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl p-6 shadow-md group hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {stat.name}
            </h3>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bills */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bills</h2>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Generate Invoice
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bill.insurance === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {bill.insurance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <DocumentTextIcon className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Insurance Claims */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Insurance Claims</h2>
            <button
              onClick={() => setShowInsuranceModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Verify Insurance
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {insuranceClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <DocumentTextIcon className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Payment Processing */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Payment Processing</h2>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Process Payment
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Processed</h3>
            <p className="text-2xl font-bold text-gray-900">₹38,450</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Successful Transactions</h3>
            <p className="text-2xl font-bold text-gray-900">98.2%</p>
            <p className="text-sm text-green-600">+2.3% from last month</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Average Processing Time</h3>
            <p className="text-2xl font-bold text-gray-900">2.3 min</p>
            <p className="text-sm text-green-600">-0.5 min from last month</p>
          </div>
        </div>
      </motion.div>

      {/* Invoice Generation Modal */}
      {showInvoiceModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Generate Invoice</h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Patient</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Robert Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Services</label>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Consultation</label>
                    <input type="number" className="ml-auto w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Amount" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Procedure</label>
                    <input type="number" className="ml-auto w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Amount" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Medication</label>
                    <input type="number" className="ml-auto w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Amount" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Process Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bill ID</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Bill</option>
                  <option>B001</option>
                  <option>B002</option>
                  <option>B003</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Method</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Net Banking</option>
                  <option>UPI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Insurance Verification Modal */}
      {showInsuranceModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Verify Insurance</h2>
              <button
                onClick={() => setShowInsuranceModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Patient</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Robert Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Provider</option>
                  <option>HealthCare Plus</option>
                  <option>MediCare</option>
                  <option>HealthGuard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter policy number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Verification Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowInsuranceModal(false)}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Verify Insurance
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BillingDashboard; 