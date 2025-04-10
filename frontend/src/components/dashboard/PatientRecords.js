import React, { useState } from 'react';
import {
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    dateOfBirth: '',
    diagnosis: '',
    status: 'Active',
  });

  const [patientRecords, setPatientRecords] = useState([
    {
      id: 'PR001',
      patientName: 'Luffy',
      dateOfBirth: '2005-05-05',
      lastVisit: '2024-04-05',
      diagnosis: 'Regular Checkup',
      status: 'Active',
      documents: 3,
      avatar: '👨',
      gender: 'Male',
      bloodType: 'O+',
      emergencyContact: {
        name: 'Ace',
        relationship: 'Brother',
        phone: '+1 234 567 8901'
      },
      insurance: {
        provider: 'HealthCare Plus',
        policyNumber: 'HC123456789',
        expiryDate: '2025-12-31'
      },
      allergies: ['Peanuts', 'Shellfish'],
      medicalConditions: ['Asthma', 'Hypertension']
    },
    {
      id: 'PR002',
      patientName: 'Zoro',
      dateOfBirth: '2003-11-11',
      lastVisit: '2024-04-04',
      diagnosis: 'Cardiac Monitoring',
      status: 'Under Treatment',
      documents: 5,
      avatar: '👨',
      gender: 'Male',
      bloodType: 'A+',
      emergencyContact: {
        name: 'Kuina',
        relationship: 'Friend',
        phone: '+1 234 567 8902'
      },
      insurance: {
        provider: 'MediCare',
        policyNumber: 'MC987654321',
        expiryDate: '2024-12-31'
      },
      allergies: ['Pollen'],
      medicalConditions: ['None']
    },
    {
      id: 'PR003',
      patientName: 'Nami',
      dateOfBirth: '2004-07-03',
      lastVisit: '2024-04-03',
      diagnosis: 'Regular Checkup',
      status: 'Active',
      documents: 2,
      avatar: '👩',
      gender: 'Female',
      bloodType: 'B+',
      emergencyContact: {
        name: 'Nojiko',
        relationship: 'Sister',
        phone: '+1 234 567 8903'
      },
      insurance: {
        provider: 'HealthGuard',
        policyNumber: 'HG456789123',
        expiryDate: '2025-06-30'
      },
      allergies: ['None'],
      medicalConditions: ['Migraine']
    },
    {
      id: 'PR004',
      patientName: 'Sanji',
      dateOfBirth: '2003-03-02',
      lastVisit: '2024-04-02',
      diagnosis: 'Regular Checkup',
      status: 'Active',
      documents: 4,
      avatar: '👨',
      gender: 'Male',
      bloodType: 'AB+',
      emergencyContact: {
        name: 'Zeff',
        relationship: 'Guardian',
        phone: '+1 234 567 8904'
      },
      insurance: {
        provider: 'WellCare',
        policyNumber: 'WC789123456',
        expiryDate: '2024-09-30'
      },
      allergies: ['None'],
      medicalConditions: ['None']
    },
    {
      id: 'PR005',
      patientName: 'Robin',
      dateOfBirth: '2002-02-06',
      lastVisit: '2024-04-01',
      diagnosis: 'Neurological Consultation',
      status: 'Under Treatment',
      documents: 6,
      avatar: '👩',
      gender: 'Female',
      bloodType: 'A-',
      emergencyContact: {
        name: 'Saul',
        relationship: 'Friend',
        phone: '+1 234 567 8905'
      },
      insurance: {
        provider: 'NeuroCare',
        policyNumber: 'NC123789456',
        expiryDate: '2025-03-31'
      },
      allergies: ['None'],
      medicalConditions: ['Chronic Headaches', 'Insomnia']
    },
    {
      id: 'PR006',
      patientName: 'Chopper',
      dateOfBirth: '2006-12-24',
      lastVisit: '2024-03-30',
      diagnosis: 'Pediatric Checkup',
      status: 'Active',
      documents: 4,
      avatar: '🦌',
      gender: 'Male',
      bloodType: 'B+',
      emergencyContact: {
        name: 'Hiriluk',
        relationship: 'Guardian',
        phone: '+1 234 567 8906'
      },
      insurance: {
        provider: 'ChildCare Plus',
        policyNumber: 'CCP789456123',
        expiryDate: '2025-12-31'
      },
      allergies: ['Pollen', 'Dust'],
      medicalConditions: ['None']
    },
    {
      id: 'PR007',
      patientName: 'Usopp',
      dateOfBirth: '2004-04-01',
      lastVisit: '2024-03-29',
      diagnosis: 'Regular Checkup',
      status: 'Active',
      documents: 3,
      avatar: '👨',
      gender: 'Male',
      bloodType: 'O+',
      emergencyContact: {
        name: 'Kaya',
        relationship: 'Friend',
        phone: '+1 234 567 8907'
      },
      insurance: {
        provider: 'HealthGuard',
        policyNumber: 'HG789456123',
        expiryDate: '2025-04-30'
      },
      allergies: ['None'],
      medicalConditions: ['None']
    }
  ]);

  const filteredRecords = patientRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPatientRecord = {
      ...newPatient,
      id: `PR${String(patientRecords.length + 1).padStart(3, '0')}`,
      lastVisit: new Date().toISOString().split('T')[0],
      documents: 0,
      avatar: newPatient.patientName.toLowerCase().includes('nami') ? '👩' : '👨',
    };
    
    setPatientRecords(prevRecords => [...prevRecords, newPatientRecord]);
    
    setNewPatient({
      patientName: '',
      dateOfBirth: '',
      diagnosis: '',
      status: 'Active',
    });
    setShowAddModal(false);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowProfileModal(true);
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 shadow-lg group hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16">
          <div className="w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 group-hover:text-blue-100 transition-colors">Patient Records</h1>
          <p className="text-blue-100 group-hover:text-blue-50 transition-colors">View and manage patient medical records</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md group hover:shadow-lg transition-all duration-300"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search patient records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all group-hover:border-blue-300"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5 group-hover:text-blue-500 transition-colors" />
        </div>
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border-gray-200 bg-white px-4 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all group-hover:border-blue-300"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Inactive">Inactive</option>
          </select>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg group"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Add Record
          </motion.button>
        </div>
      </motion.div>

      {/* Patient Records Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredRecords.map((patient) => (
          <motion.div
            key={patient.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => handlePatientClick(patient)}
            className="relative group cursor-pointer"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            
            {/* Main Card Content */}
            <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {patient.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{patient.patientName}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">ID: {patient.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm group-hover:scale-105 transition-transform ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                  patient.status === 'Under Treatment' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {patient.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-800 transition-colors">
                  <CalendarIcon className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-800 transition-colors">
                  <DocumentTextIcon className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span>Diagnosis: {patient.diagnosis}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-800 transition-colors">
                  <FolderIcon className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <span>Documents: {patient.documents}</span>
                </div>
              </div>
              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Patient Profile Modal */}
      {selectedPatient && showProfileModal && (
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
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto group"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Patient Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-md p-6 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Basic Information</h3>
                  <button className="text-purple-600 hover:text-purple-800 transition-colors">
                    <PencilIcon className="h-5 w-5 hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl">{selectedPatient.avatar}</span>
                  <div>
                    <h4 className="text-xl font-semibold">{selectedPatient.patientName}</h4>
                    <p className="text-gray-500">ID: {selectedPatient.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{new Date().getFullYear() - new Date(selectedPatient.dateOfBirth).getFullYear()} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="font-medium">{selectedPatient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedPatient.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedPatient.status === 'Under Treatment'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="bg-white rounded-xl shadow-md p-6 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Emergency Contact</h3>
                  <button className="text-purple-600 hover:text-purple-800 transition-colors">
                    <PencilIcon className="h-5 w-5 hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{selectedPatient.emergencyContact.name}</p>
                      <p className="text-sm text-gray-500">{selectedPatient.emergencyContact.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-600">{selectedPatient.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Insurance Information Card */}
              <div className="bg-white rounded-xl shadow-md p-6 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Insurance Information</h3>
                  <button className="text-purple-600 hover:text-purple-800 transition-colors">
                    <PencilIcon className="h-5 w-5 hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{selectedPatient.insurance.provider}</p>
                      <p className="text-sm text-gray-500">Policy: {selectedPatient.insurance.policyNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-600">Expires: {selectedPatient.insurance.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information Cards */}
              <div className="space-y-6">
                {/* Allergies Card */}
                <div className="bg-white rounded-xl shadow-md p-6 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Allergies</h3>
                    <button className="text-purple-600 hover:text-purple-800 transition-colors">
                      <PencilIcon className="h-5 w-5 hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medical Conditions Card */}
                <div className="bg-white rounded-xl shadow-md p-6 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Medical Conditions</h3>
                    <button className="text-purple-600 hover:text-purple-800 transition-colors">
                      <PencilIcon className="h-5 w-5 hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.medicalConditions.map((condition, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Record Modal */}
      {showAddModal && (
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
            className="bg-white rounded-2xl p-6 w-full max-w-md group"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Add New Patient</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 hover:scale-110 transition-transform" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={newPatient.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={newPatient.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={newPatient.diagnosis}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newPatient.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="Active">Active</option>
                  <option value="Under Treatment">Under Treatment</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <span className="group-hover:scale-105 transition-transform">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg group"
                >
                  <span className="group-hover:scale-105 transition-transform">Add Patient</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PatientRecords; 