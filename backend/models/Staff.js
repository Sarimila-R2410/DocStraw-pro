const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['doctor', 'nurse', 'admin', 'receptionist'],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: function() {
      return this.role === 'doctor';
    },
  },
  contactNumber: {
    type: String,
    required: true,
  },
  shifts: [{
    date: Date,
    startTime: String,
    endTime: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'absent'],
      default: 'scheduled'
    }
  }],
  leaves: [{
    startDate: Date,
    endDate: Date,
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
staffSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
staffSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Virtual for full name
staffSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff; 