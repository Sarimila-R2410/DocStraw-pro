const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.staff = await Staff.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Get all staff members
router.get('/', protect, async (req, res) => {
  try {
    const staff = await Staff.find().select('-password');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get staff by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).select('-password');
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create new staff member
router.post('/', protect, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      department,
      specialization,
      contactNumber,
    } = req.body;

    const staffExists = await Staff.findOne({ email });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    const staff = await Staff.create({
      firstName,
      lastName,
      email,
      password,
      role,
      department,
      specialization,
      contactNumber,
    });

    res.status(201).json({
      _id: staff._id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
      department: staff.department,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update staff member
router.put('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');

    res.json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete staff member
router.delete('/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    await staff.remove();
    res.json({ message: 'Staff removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Staff login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (!staff || !(await staff.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      _id: staff._id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Manage staff shifts
router.post('/:id/shifts', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    staff.shifts.push(req.body);
    await staff.save();

    res.json(staff.shifts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Manage leave requests
router.post('/:id/leaves', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    staff.leaves.push(req.body);
    await staff.save();

    res.json(staff.leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 