import React from 'react';

/**
 * Top navigation bar showing current page heading and quick controls.
 */
function Navbar({ activeTab, onToggleSidebar, onQuickAdd }) {
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'System Overview & Analytics';
      case 'view-students':
        return 'Student Directory';
      case 'add-student':
        return 'Enroll New Student';
      case 'edit-student':
        return 'Update Student Details';
      default:
        return 'Student Management System';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="navbar__title-block">
          <h1 className="navbar__title">{getPageTitle()}</h1>
          <span className="navbar__subtitle">EduTrack Dashboard • Fall Session</span>
        </div>
      </div>

      <div className="navbar__right">
        {activeTab !== 'add-student' && (
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={onQuickAdd}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Student
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
