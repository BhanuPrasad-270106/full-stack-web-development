import React, { useState, useEffect, useCallback } from 'react';
import { initialStudents } from './data/initialStudents';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ViewStudents from './pages/ViewStudents';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import './App.css';

// Smart URL resolver: seamlessly handles base domain with or without trailing slash or /api/students
const getApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim().replace(/\/+$/, '');
  return envUrl.endsWith('/api/students') ? envUrl : `${envUrl}/api/students`;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Root Application Component for Student Management System.
 * Connects to Express REST API with resilient state management.
 */
function App() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to display temporary toast notifications
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch all students from Express REST API
  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setStudents(result.data);
        setIsServerConnected(true);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.warn('Backend currently unreachable, using sample data:', error.message);
      setIsServerConnected(false);
      setStudents(initialStudents);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Add new student
  const handleAddStudent = async (studentData) => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStudents((prev) => [result.data, ...prev]);
        setIsServerConnected(true);
        showToast(`Student "${result.data.name}" added successfully!`, 'success');
        return { success: true, data: result.data };
      } else {
        const errorMsg = result.message || 'Error adding student to database.';
        showToast(errorMsg, 'warning');
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error('API Error adding student:', error);
      const networkError = `Network Error: Cannot connect to backend at ${API_BASE_URL}. Ensure your backend server is running.`;
      showToast('Network error: Unable to reach backend server', 'warning');
      return { success: false, message: networkError };
    }
  };

  // Trigger edit mode for a student
  const handleStartEdit = (student) => {
    setSelectedStudent(student);
    setActiveTab('edit-student');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update existing student
  const handleUpdateStudent = async (updatedStudent) => {
    const studentId = updatedStudent.id || updatedStudent._id;
    try {
      const res = await fetch(`${API_BASE_URL}/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setStudents((prev) =>
          prev.map((s) => ((s.id === studentId || s._id === studentId) ? result.data : s))
        );
        setSelectedStudent(result.data);
        setIsServerConnected(true);
        showToast(`Student "${result.data.name}" updated successfully!`, 'success');
        return { success: true, data: result.data };
      } else {
        const errorMsg = result.message || 'Failed to update student';
        showToast(errorMsg, 'warning');
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      console.error('API Error updating student:', error);
      showToast('Network error: Unable to reach backend server', 'warning');
      return { success: false, message: 'Unable to reach backend server' };
    }
  };

  // Delete a student
  const handleDeleteStudent = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the student record for "${name}"?\nThis action cannot be undone.`
    );

    if (confirmed) {
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE'
        });
        const result = await res.json();

        if (res.ok && result.success) {
          setStudents((prev) => prev.filter((s) => s.id !== id && s._id !== id));
          setIsServerConnected(true);
          showToast(`Student "${name}" deleted successfully!`, 'warning');
        } else {
          showToast(result.message || 'Failed to delete student', 'warning');
        }
      } catch (error) {
        console.error('API Error deleting student:', error);
        showToast('Network error: Unable to reach backend server', 'warning');
      }

      // If the currently edited student was deleted, clear selection
      if (selectedStudent && (selectedStudent.id === id || selectedStudent._id === id)) {
        setSelectedStudent(null);
        setActiveTab('view-students');
      }
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentCount={students.length}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Layout */}
      <div className="main-wrapper">
        <Navbar
          activeTab={activeTab}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onQuickAdd={() => {
            setSelectedStudent(null);
            setActiveTab('add-student');
          }}
        />

        {/* Global Toast Notification */}
        {toast && (
          <div className="toast-container">
            <div className={`toast toast--${toast.type}`}>
              <span className="toast__dot"></span>
              <span className="toast__message">{toast.message}</span>
              <button
                type="button"
                className="toast__close"
                onClick={() => setToast(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Page Content View Router */}
        <main className="content-container">
          {isLoading && students.length === 0 ? (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Loading student records...
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  students={students}
                  setActiveTab={setActiveTab}
                  onEditStudent={handleStartEdit}
                  onDeleteStudent={handleDeleteStudent}
                />
              )}

              {activeTab === 'view-students' && (
                <ViewStudents
                  students={students}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteStudent}
                  onNavigateToAdd={() => setActiveTab('add-student')}
                />
              )}

              {activeTab === 'add-student' && (
                <AddStudent
                  onAddStudent={handleAddStudent}
                  onNavigateToView={() => setActiveTab('view-students')}
                />
              )}

              {activeTab === 'edit-student' && (
                <EditStudent
                  student={selectedStudent}
                  onUpdateStudent={handleUpdateStudent}
                  onCancel={() => setActiveTab('view-students')}
                />
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            © 2026 EduTrack Student Management System • Powered by React.js & Express.js
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
