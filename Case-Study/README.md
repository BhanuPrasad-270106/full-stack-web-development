# Student Management System

A full-stack, responsive Student Management System powered by **React.js**, **Vite**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

---

## 📁 Repository Structure

```text
Case-Study/
├── frontend/                     # React.js + Vite Frontend
│   ├── index.html                # HTML entry point with Inter font
│   ├── package.json              # Frontend scripts & dependencies
│   ├── vite.config.js            # Vite configuration
│   └── src/
│       ├── main.jsx              # React DOM entry point
│       ├── App.jsx               # Root state, connects to Express API
│       ├── App.css               # Component & responsive styles
│       ├── index.css             # Base CSS variables & resets
│       ├── data/
│       │   └── initialStudents.js# Sample student dataset fallback
│       ├── components/           # Sidebar, Navbar, StatCard, StudentTable, StudentForm
│       └── pages/                # Dashboard, ViewStudents, AddStudent, EditStudent
│
└── backend/                      # Node.js + Express.js REST API
    ├── server.js                 # Express server with MongoDB Atlas connection
    ├── .env                      # Server configuration & MongoDB URI
    ├── package.json              # Backend dependencies (express, mongoose, cors, dotenv, nodemon)
    ├── models/
    │   └── Student.js            # Mongoose Schema & Model for MongoDB
    ├── controllers/
    │   └── studentController.js  # Async/await controller handlers for REST endpoints
    └── routes/
        └── studentRoutes.js      # Express router for /api/students
```

---

## 🍃 MongoDB Atlas Configuration

- **Cluster**: `cluster0.05jqr1f.mongodb.net`
- **Database**: `student_db`
- **Collection**: `students`

The connection string in [backend/.env](file:///c:/Users/bhanu/OneDrive/Desktop/Case-Study/backend/.env) is configured with URL-encoded credentials:
```env
MONGODB_URI=mongodb+srv://studentadmin:Krish%402006@cluster0.05jqr1f.mongodb.net/student_db?retryWrites=true&w=majority
```

---

## 🚀 How to Run the Application

### 1. Start the Backend API (Express + MongoDB Atlas)
```powershell
cd c:\Users\bhanu\OneDrive\Desktop\Case-Study\backend
npm start
```
> Connected to MongoDB Atlas! API runs at **http://localhost:5000/api/students**

### 2. Start the Frontend (React + Vite)
```powershell
cd c:\Users\bhanu\OneDrive\Desktop\Case-Study\frontend
npm run dev
```
> Open in your browser at **http://localhost:5173**
