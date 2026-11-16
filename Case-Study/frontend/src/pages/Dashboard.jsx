import React from 'react';
import StatCard from '../components/StatCard';

/**
 * Dashboard page displaying overall system metrics and student statistics.
 */
function Dashboard({ students, setActiveTab, onEditStudent, onDeleteStudent }) {
  // Compute statistics
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const inactiveStudents = totalStudents - activeStudents;

  // Department distribution
  const departmentCounts = students.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  const totalDepartments = Object.keys(departmentCounts).length;

  // Year distribution
  const yearCounts = students.reduce((acc, curr) => {
    acc[curr.year] = (acc[curr.year] || 0) + 1;
    return acc;
  }, {});

  // Recent 4 students
  const recentStudents = [...students].slice(-4).reverse();

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-banner__text">
          <h2>Welcome to EduTrack Dashboard 👋</h2>
          <p>
            Monitor real-time student enrollment stats, academic department distribution, and student directory records.
          </p>
        </div>
        <div className="welcome-banner__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setActiveTab('add-student')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Student
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => setActiveTab('view-students')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            View All Students
          </button>
        </div>
      </div>

      {/* Primary Key Metric Cards */}
      <section className="stats-grid">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="All enrolled student records"
          variant="primary"
          icon={(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          )}
          onClick={() => setActiveTab('view-students')}
        />

        <StatCard
          title="Active Students"
          value={activeStudents}
          subtitle={`${totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}% of student body`}
          variant="success"
          icon={(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
          onClick={() => setActiveTab('view-students')}
        />

        <StatCard
          title="Inactive Students"
          value={inactiveStudents}
          subtitle="On leave or alumni records"
          variant="warning"
          icon={(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="10" y1="15" x2="10" y2="9" />
              <line x1="14" y1="15" x2="14" y2="9" />
            </svg>
          )}
          onClick={() => setActiveTab('view-students')}
        />

        <StatCard
          title="Departments"
          value={totalDepartments}
          subtitle="Active academic faculties"
          variant="info"
          icon={(
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )}
        />
      </section>

      {/* Two Column Section: Department Breakdown & Year Distribution */}
      <div className="analytics-grid">
        {/* Department Distribution Card */}
        <div className="card">
          <div className="card__header">
            <div>
              <h3 className="card__title">Department Distribution</h3>
              <p className="card__subtitle">Enrollment count by academic department</p>
            </div>
            <span className="badge badge--pill">{totalDepartments} Depts</span>
          </div>

          <div className="distribution-list">
            {Object.keys(departmentCounts).length === 0 ? (
              <p className="text-muted">No department data available.</p>
            ) : (
              Object.entries(departmentCounts).map(([dept, count]) => {
                const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                return (
                  <div key={dept} className="distribution-item">
                    <div className="distribution-item__meta">
                      <span className="distribution-item__label">{dept}</span>
                      <span className="distribution-item__count">
                        {count} {count === 1 ? 'student' : 'students'} ({percentage}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar__fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Academic Year Distribution Card */}
        <div className="card">
          <div className="card__header">
            <div>
              <h3 className="card__title">Academic Year Breakdown</h3>
              <p className="card__subtitle">Students grouped by study year</p>
            </div>
          </div>

          <div className="year-stat-cards">
            {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => {
              const count = yearCounts[yr] || 0;
              return (
                <div key={yr} className="year-stat-card">
                  <span className="year-stat-card__title">{yr}</span>
                  <span className="year-stat-card__number">{count}</span>
                  <span className="year-stat-card__label">Enrolled</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Students Table Section */}
      <div className="card">
        <div className="card__header">
          <div>
            <h3 className="card__title">Recently Added Students</h3>
            <p className="card__subtitle">Latest entries registered in the portal</p>
          </div>
          <button
            type="button"
            className="btn btn--link"
            onClick={() => setActiveTab('view-students')}
          >
            View All →
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <p className="text-muted">No students registered yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="student-table student-table--compact">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="badge badge--code">{student.rollNumber}</span>
                    </td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>
                      <span className={`status-badge status-badge--${student.status.toLowerCase()}`}>
                        <span className="status-dot"></span>
                        {student.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn-text"
                        onClick={() => onEditStudent(student)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
