import React, { useState, useMemo } from 'react';
import StudentTable from '../components/StudentTable';
import { DEPARTMENTS } from '../data/initialStudents';

/**
 * ViewStudents page displaying full list with real-time search & filters.
 */
function ViewStudents({ students, onEdit, onDelete, onNavigateToAdd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter students based on search query, department, and status
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search by student name or roll number
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query);

      // Department filter
      const matchesDept =
        selectedDept === 'All' || student.department === selectedDept;

      // Status filter
      const matchesStatus =
        selectedStatus === 'All' || student.status === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchTerm, selectedDept, selectedStatus]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedStatus('All');
  };

  const isFiltered = searchTerm !== '' || selectedDept !== 'All' || selectedStatus !== 'All';

  return (
    <div className="view-students-page">
      {/* Top Header Card */}
      <div className="page-header-card">
        <div className="page-header-card__text">
          <h2>Student Records Directory</h2>
          <p>
            Browse, search, edit, and manage all enrolled students in the institution.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onNavigateToAdd}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Student
        </button>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="filter-panel card">
        <div className="filter-panel__grid">
          {/* Search Input */}
          <div className="search-box">
            <label htmlFor="student-search" className="filter-label">
              Search Students
            </label>
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="student-search"
                type="text"
                className="search-input"
                placeholder="Search by student name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search text"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Department Filter */}
          <div className="filter-control">
            <label htmlFor="dept-filter" className="filter-label">
              Department
            </label>
            <select
              id="dept-filter"
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-control">
            <label htmlFor="status-filter" className="filter-label">
              Status
            </label>
            <select
              id="status-filter"
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <div className="filter-reset-wrapper">
              <label className="filter-label">&nbsp;</label>
              <button
                type="button"
                className="btn btn--outline btn--block"
                onClick={handleClearFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Counter and Results Summary */}
        <div className="filter-summary">
          <span>
            Showing <strong>{filteredStudents.length}</strong> of{' '}
            <strong>{students.length}</strong> students
          </span>
          {isFiltered && (
            <span className="badge badge--pill">Filtered results</span>
          )}
        </div>
      </div>

      {/* Student Table Container */}
      <div className="card table-card">
        <StudentTable
          students={filteredStudents}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default ViewStudents;
