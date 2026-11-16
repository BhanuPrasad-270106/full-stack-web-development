import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, YEARS } from '../data/initialStudents';

/**
 * Reusable form component for both Adding and Editing a student.
 */
function StudentForm({ initialData = null, onSubmit, onCancel, submitLabel = 'Submit' }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: '',
    year: '',
    phone: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  // Populate data when editing an existing student
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        rollNumber: initialData.rollNumber || '',
        email: initialData.email || '',
        department: initialData.department || '',
        year: initialData.year || '',
        phone: initialData.phone || '',
        status: initialData.status || 'Active'
      });
    }
  }, [initialData]);

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for field once user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Student Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll Number is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department.';
    }

    if (!formData.year) {
      newErrors.year = 'Please select an academic year.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        name: formData.name.trim(),
        rollNumber: formData.rollNumber.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim()
      });
    }
  };

  const handleReset = () => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        rollNumber: initialData.rollNumber || '',
        email: initialData.email || '',
        department: initialData.department || '',
        year: initialData.year || '',
        phone: initialData.phone || '',
        status: initialData.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        rollNumber: '',
        email: '',
        department: '',
        year: '',
        phone: '',
        status: 'Active'
      });
    }
    setErrors({});
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {/* Student Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Student Full Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            placeholder="e.g. Aarav Sharma"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Roll Number */}
        <div className="form-group">
          <label htmlFor="rollNumber" className="form-label">
            Roll Number <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            className={`form-input ${errors.rollNumber ? 'form-input--error' : ''}`}
            placeholder="e.g. CS-2024-101"
            value={formData.rollNumber}
            onChange={handleChange}
          />
          {errors.rollNumber && <span className="form-error">{errors.rollNumber}</span>}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
            placeholder="e.g. student@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
            placeholder="e.g. 9876543210 (10 digits)"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department <span className="required-star">*</span>
          </label>
          <select
            id="department"
            name="department"
            className={`form-select ${errors.department ? 'form-input--error' : ''}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">-- Select Department --</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <span className="form-error">{errors.department}</span>}
        </div>

        {/* Academic Year */}
        <div className="form-group">
          <label htmlFor="year" className="form-label">
            Academic Year <span className="required-star">*</span>
          </label>
          <select
            id="year"
            name="year"
            className={`form-select ${errors.year ? 'form-input--error' : ''}`}
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">-- Select Academic Year --</option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          {errors.year && <span className="form-error">{errors.year}</span>}
        </div>

        {/* Status */}
        <div className="form-group form-group--full">
          <label className="form-label">Enrollment Status</label>
          <div className="status-radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === 'Active'}
                onChange={handleChange}
              />
              <span className="radio-custom"></span>
              <span className="radio-label">Active</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === 'Inactive'}
                onChange={handleChange}
              />
              <span className="radio-custom"></span>
              <span className="radio-label">Inactive</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          {submitLabel}
        </button>

        <button type="button" className="btn btn--secondary" onClick={handleReset}>
          Reset
        </button>

        {onCancel && (
          <button type="button" className="btn btn--outline" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
