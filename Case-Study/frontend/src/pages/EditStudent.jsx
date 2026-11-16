import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';

/**
 * EditStudent page to update existing student records.
 */
function EditStudent({ student, onUpdateStudent, onCancel }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback if no student was selected
  if (!student) {
    return (
      <div className="form-page-container">
        <div className="card text-center" style={{ padding: '3rem 1.5rem' }}>
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" style={{ margin: '0 auto', color: 'var(--color-text-muted)' }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h3 style={{ marginTop: '1rem', color: 'var(--color-text-main)' }}>No Student Selected for Editing</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Please select a student from the Student Directory table to edit their profile details.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onCancel}
          >
            Go to Student Directory
          </button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (updatedData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const result = await onUpdateStudent({
      ...updatedData,
      id: student.id || student._id
    });
    setIsSubmitting(false);

    if (result && result.success) {
      setSuccessMessage(`Record for "${updatedData.name}" has been successfully updated.`);
      setErrorMessage('');
    } else {
      setErrorMessage(result?.message || 'Failed to update student in database.');
      setSuccessMessage('');
    }

    // Scroll to top to see notification
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="form-page-container">
      {/* Header Info */}
      <div className="page-header-card">
        <div className="page-header-card__text">
          <h2>Edit Student Profile</h2>
          <p>
            Editing record for <strong>{student.name}</strong> ({student.rollNumber})
          </p>
        </div>
        <button
          type="button"
          className="btn btn--outline"
          onClick={onCancel}
        >
          ← Back to Students
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="alert alert--success">
          <div className="alert__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="alert__content">
            <strong>Update Successful!</strong>
            <p>{successMessage}</p>
          </div>
          <div className="alert__actions">
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={onCancel}
            >
              Back to Directory
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

      {/* Error Notification */}
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
            <strong>Update Failed</strong>
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

      {/* Main Edit Form Card */}
      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Update Student Information</h3>
            <p className="card__subtitle">Modify any of the details below and click Save Changes.</p>
          </div>
          <span className="badge badge--code">ID: #{student.id || student._id}</span>
        </div>

        <StudentForm
          initialData={student}
          onSubmit={handleFormSubmit}
          onCancel={onCancel}
          submitLabel={isSubmitting ? "Saving..." : "Save Changes"}
        />
      </div>
    </div>
  );
}

export default EditStudent;
