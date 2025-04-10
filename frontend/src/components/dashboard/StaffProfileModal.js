import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, UserCircleIcon, BriefcaseIcon, BuildingOfficeIcon, ClockIcon, EnvelopeIcon, AcademicCapIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const StaffProfileModal = ({ staff, onClose }) => {
  if (!staff) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status) => {
    return status === 'Active' ? CheckCircleIcon : XCircleIcon;
  };

  const StatusIcon = getStatusIcon(staff.status);


  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Close modal on backdrop click
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
             <span className="text-4xl mr-2">{staff.avatar || '👤'}</span>
             <div>
                <h2 className="text-xl font-semibold text-gray-800">{staff.name}</h2>
                <p className="text-sm text-gray-500">Staff ID: {staff.id}</p>
             </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Details Column 1 */}
            <div className="space-y-4">
                <DetailItem icon={BriefcaseIcon} label="Role" value={staff.role} />
                <DetailItem icon={BuildingOfficeIcon} label="Department" value={staff.department} />
                <DetailItem icon={EnvelopeIcon} label="Email" value={staff.email} isLink={`mailto:${staff.email}`} />
            </div>

            {/* Details Column 2 */}
             <div className="space-y-4">
                <DetailItem icon={AcademicCapIcon} label="Experience" value={staff.experience} />
                <div className="flex items-center space-x-2 text-gray-700">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(staff.status)}`} />
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(staff.status)}`}>
                      {staff.status}
                    </span>
                </div>
                {/* Add more details here if needed */}
             </div>
        </div>

        {/* Optional Footer */}
        {/* <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center">Staff details are confidential.</p>
        </div> */}
      </motion.div>
    </motion.div>
  );
};

// Helper component for consistent detail item display
const DetailItem = ({ icon: Icon, label, value, isLink = null }) => (
  <div className="flex items-start space-x-3 text-gray-700">
    <Icon className="h-5 w-5 mt-0.5 text-indigo-500 flex-shrink-0" />
    <div>
        <span className="text-sm font-medium block text-gray-500">{label}</span>
        {isLink ? (
            <a href={isLink} className="text-sm text-indigo-600 hover:underline break-all">
                {value}
            </a>
        ) : (
            <span className="text-sm text-gray-800 break-words">{value}</span>
        )}
    </div>
  </div>
);

export default StaffProfileModal; 