import React from 'react';

/**
 * Reusable StudentTable component to display student records in a structured table.
 */
function StudentTable({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return (
      <div className="table-empty-state">
        <div className="table-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3>No student records found</h3>
        <p>Try modifying your search query or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <span className="badge badge--code">{student.rollNumber}</span>
              </td>
              <td>
                <div className="student-cell-name">
                  <div className="student-avatar-small">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>{student.name}</strong>
                  </div>
                </div>
              </td>
              <td>
                <a href={`mailto:${student.email}`} className="table-link">
                  {student.email}
                </a>
              </td>
              <td>
                <span className="department-tag">{student.department}</span>
              </td>
              <td>{student.year}</td>
              <td>{student.phone}</td>
              <td>
                <span className={`status-badge status-badge--${student.status.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  {student.status}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="btn-icon btn-icon--edit"
                    title="Edit Student"
                    onClick={() => onEdit(student)}
                    aria-label={`Edit ${student.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="btn-icon btn-icon--delete"
                    title="Delete Student"
                    onClick={() => onDelete(student.id, student.name)}
                    aria-label={`Delete ${student.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
