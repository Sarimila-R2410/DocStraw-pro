const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Mock data routes
app.get('/api/patients', (req, res) => {
  res.json({
    patients: [
      {
        id: 'P001',
        name: 'Luffy',
        age: 19,
        condition: 'Regular Checkup',
        status: 'Scheduled',
        lastVisit: '2024-04-05'
      },
      {
        id: 'P002',
        name: 'Zoro',
        age: 21,
        condition: 'Cardiac Monitoring',
        status: 'In Treatment',
        lastVisit: '2024-04-04'
      },
      {
        id: 'P003',
        name: 'Nami',
        age: 20,
        condition: 'Regular Checkup',
        status: 'Regular',
        lastVisit: '2024-04-03'
      },
      {
        id: 'P004',
        name: 'Sanji',
        age: 21,
        condition: 'Regular Checkup',
        status: 'Scheduled',
        lastVisit: '2024-04-02'
      }
    ],
    stats: {
      totalPatients: 1284,
      appointmentsToday: 45,
      pendingReports: 15,
      averageWaitTime: '18 min'
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 