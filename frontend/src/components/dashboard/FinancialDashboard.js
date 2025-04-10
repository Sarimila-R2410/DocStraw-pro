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
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
import { motion } from 'framer-motion';

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

const FinancialDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showStatDetails, setShowStatDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 'T001',
      date: '2024-04-05',
      description: 'Patient Consultation',
      amount: 150.00,
      type: 'income',
      category: 'Consultation',
      status: 'Completed',
    },
    {
      id: 'T002',
      date: '2024-04-04',
      description: 'Medical Supplies',
      amount: 500.00,
      type: 'expense',
      category: 'Supplies',
      status: 'Completed',
    },
    {
      id: 'T003',
      date: '2024-04-03',
      description: 'Insurance Payment',
      amount: 2000.00,
      type: 'income',
      category: 'Insurance',
      status: 'Pending',
    },
    {
      id: 'T004',
      date: '2024-04-02',
      description: 'Equipment Maintenance',
      amount: 300.00,
      type: 'expense',
      category: 'Maintenance',
      status: 'Completed',
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'income',
    category: '',
    status: 'Pending',
  });

  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: '',
    time: '',
    amount: '',
    priority: 'medium',
    notes: '',
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransactionWithId = {
      ...newTransaction,
      id: `T${String(transactions.length + 1).padStart(3, '0')}`,
    };
    setTransactions([...transactions, newTransactionWithId]);
    setNewTransaction({
      date: '',
      description: '',
      amount: '',
      type: 'income',
      category: '',
      status: 'Pending',
    });
    setShowAddTransactionForm(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
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
      case 'Total Revenue':
        return transactions.filter(t => t.type === 'income');
      case 'Total Expenses':
        return transactions.filter(t => t.type === 'expense');
      case 'Pending Payments':
        return transactions.filter(t => t.status === 'Pending');
      case 'Profit Margin':
        return transactions;
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
      amount: '',
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

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowDetailsModal(true);
  };

  const financialStats = [
    {
      name: 'Total Revenue',
      value: '₹45,231',
      change: '+20.1%',
      icon: CurrencyDollarIcon,
      details: {
        title: 'Revenue Breakdown',
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
      name: 'Expenses',
      value: '₹12,450',
      change: '-5.2%',
      icon: ArrowTrendingDownIcon,
      details: {
        title: 'Expense Breakdown',
        data: [
          { label: 'Staff Salaries', value: '₹6,000', percentage: '48%' },
          { label: 'Medical Supplies', value: '₹3,000', percentage: '24%' },
          { label: 'Facility Costs', value: '₹2,000', percentage: '16%' },
          { label: 'Other', value: '₹1,450', percentage: '12%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [15000, 14000, 13000, 12450],
        },
      },
    },
    {
      name: 'Net Income',
      value: '₹32,781',
      change: '+25.3%',
      icon: ChartBarIcon,
      details: {
        title: 'Income Analysis',
        data: [
          { label: 'Gross Profit', value: '₹45,231', percentage: '100%' },
          { label: 'Operating Expenses', value: '₹12,450', percentage: '28%' },
          { label: 'Net Profit', value: '₹32,781', percentage: '72%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [25000, 28000, 30000, 32781],
        },
      },
    },
    {
      name: 'Profit Margin',
      value: '72.5%',
      change: '+3.1%',
      icon: ChartPieIcon,
      details: {
        title: 'Margin Analysis',
        data: [
          { label: 'Current Margin', value: '72.5%', percentage: '72.5%' },
          { label: 'Industry Average', value: '65%', percentage: '65%' },
          { label: 'Target Margin', value: '75%', percentage: '75%' },
        ],
        trend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          data: [65, 68, 70, 72.5],
        },
      },
    },
  ];

  // Add chart data
  const revenueTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [120000, 150000, 180000, 200000, 220000, 250000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const expenseBreakdownData = {
    labels: ['Salaries', 'Equipment', 'Supplies', 'Utilities', 'Other'],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
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
          <h1 className="text-3xl font-bold mb-2">Welcome to Financial Dashboard</h1>
          <p className="text-purple-100">Monitor and manage financial activities</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {financialStats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => handleCardClick(stat)}
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
            <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Click for details
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Trend Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
          <Line
              data={revenueTrendData}
            options={{
              responsive: true,
                maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                      callback: (value) => `₹${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
        </motion.div>

        {/* Expense Breakdown Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="h-80">
          <Doughnut
              data={expenseBreakdownData}
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
        </motion.div>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button
            onClick={() => setShowAddTransactionForm(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ₹{parseFloat(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTransaction(transaction.id)}
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
      </motion.div>

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

      {/* Add Transaction Form Modal */}
      {showAddTransactionForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Add New Transaction</h2>
              <button
                onClick={() => setShowAddTransactionForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={newTransaction.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Salary">Salary</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newTransaction.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddTransactionForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Add Transaction
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
              <h2 className="text-2xl font-bold text-gray-900">Financial Analytics</h2>
              <button
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₹45,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Revenue Growth</p>
                    <p className="text-2xl font-bold">+12%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Expense Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Monthly Expenses</p>
                    <p className="text-2xl font-bold">₹15,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Expense Growth</p>
                    <p className="text-2xl font-bold">+8%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Profit Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Monthly Profit</p>
                    <p className="text-2xl font-bold">₹30,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Profit Margin</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Cash Flow</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700">Operating Cash Flow</p>
                    <p className="text-2xl font-bold">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Free Cash Flow</p>
                    <p className="text-2xl font-bold">₹20,000</p>
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
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={reminderForm.amount}
                  onChange={handleReminderInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
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

      {/* Details Modal */}
      {showDetailsModal && selectedCard && (
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
            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCard.details.title}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h3>
                <div className="space-y-4">
                  {selectedCard.details.data.map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-gray-600">{item.label}</span>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-900">{item.value}</span>
                        <span className="text-sm text-gray-500">({item.percentage})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend</h3>
                <div className="h-48">
                  <Line
                    data={{
                      labels: selectedCard.details.trend.labels,
                      datasets: [
                        {
                          label: selectedCard.name,
                          data: selectedCard.details.trend.data,
                          borderColor: 'rgb(59, 130, 246)',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
    </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FinancialDashboard; 