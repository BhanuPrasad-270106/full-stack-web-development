import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';

/**
 * AddStudent page to register new students into the system.
 */
function AddStudent({ onAddStudent, onNavigateToView }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (studentData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const result = await onAddStudent(studentData);
    setIsSubmitting(false);

    if (result && result.success) {
      setSuccessMessage(`Student "${studentData.name}" has been successfully enrolled!`);
      setErrorMessage('');
    } else {
      setErrorMessage(
        result?.message || 'Failed to enroll student. Please verify your backend server is running.'
      );
      setSuccessMessage('');
    }

    // Auto-scroll to top to see feedback
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="form-page-container">
      {/* Header Info */}
      <div className="page-header-card">
        <div className="page-header-card__text">
          <h2>Enroll New Student</h2>
          <p>
            Fill out the details below to add a student to the system.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--outline"
          onClick={onNavigateToView}
        >
          View All Students
        </button>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="alert alert--success">
          <div className="alert__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="alert__content">
            <strong>Registration Successful!</strong>
            <p>{successMessage}</p>
          </div>
          <div className="alert__actions">
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={onNavigateToView}
            >
              Go to Directory
            </button>
            <button
              type="button"
              className="alert__close-btn"
              onClick={() => setSuccessMessage('')}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="alert alert--danger">
          <div className="alert__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="alert__content">
            <strong>Enrollment Failed</strong>
            <p>{errorMessage}</p>
          </div>
          <button
            type="button"
            className="alert__close-btn"
            onClick={() => setErrorMessage('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Form Card */}
      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Student Information</h3>
            <p className="card__subtitle">Fields marked with an asterisk (*) are required</p>
          </div>
        </div>

        <StudentForm
          onSubmit={handleFormSubmit}
          onCancel={onNavigateToView}
          submitLabel={isSubmitting ? "Enrolling..." : "Enroll Student"}
        />
      </div>
    </div>
  );
}

export default AddStudent;
