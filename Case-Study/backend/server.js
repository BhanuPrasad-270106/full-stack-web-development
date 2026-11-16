const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Use default DNS if override fails
}

// Import Routes and Student Model
const studentRoutes = require('./routes/studentRoutes');
const Student = require('./models/Student');

// Initialize Express Application
const app = express();

// ============================================================================
// DATABASE CONNECTION (MONGODB ATLAS)
// ============================================================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`====================================================`);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`====================================================`);

    // Seed sample records if database collection is empty
    const count = await Student.countDocuments();
    if (count === 0) {
      console.log('Seeding initial student records into MongoDB Atlas...');
      await Student.insertMany([
        {
          name: "Aarav Sharma",
          rollNumber: "CS-2024-101",
          email: "aarav.sharma@example.com",
          department: "Computer Science",
          year: "3rd Year",
          phone: "9876543210",
          status: "Active"
        },
        {
          name: "Sneha Patel",
          rollNumber: "IT-2024-204",
          email: "sneha.patel@example.com",
          department: "Information Technology",
          year: "2nd Year",
          phone: "9812345678",
          status: "Active"
        },
        {
          name: "Rohan Verma",
          rollNumber: "ME-2024-055",
          email: "rohan.verma@example.com",
          department: "Mechanical Engineering",
          year: "4th Year",
          phone: "9745612389",
          status: "Inactive"
        },
        {
          name: "Priya Nair",
          rollNumber: "EC-2024-112",
          email: "priya.nair@example.com",
          department: "Electronics & Comm.",
          year: "3rd Year",
          phone: "9654123780",
          status: "Active"
        },
        {
          name: "Vikram Malhotra",
          rollNumber: "CE-2024-032",
          email: "vikram.m@example.com",
          department: "Civil Engineering",
          year: "1st Year",
          phone: "9988776655",
          status: "Active"
        }
      ]);
      console.log('Default student records seeded successfully.');
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  }
};

connectDB();

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================
// 1. Enable CORS for cross-origin requests from the React frontend
app.use(cors());

// 2. Parse incoming JSON payloads in request body
app.use(express.json());

// 3. Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Root Health & Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management System REST API is running with MongoDB Atlas',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id'
    }
  });
});

// Mount Student API Routes
app.use('/api/students', studentRoutes);

// 404 Handler for undefined API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Student Management API Server is running on PORT: ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}/api/students`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
