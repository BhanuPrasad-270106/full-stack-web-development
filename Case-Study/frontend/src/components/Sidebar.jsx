import React from 'react';

/**
 * Sidebar navigation component with links to all main sections.
 */
function Sidebar({ activeTab, setActiveTab, studentCount, isOpen, onClose }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      id: 'view-students',
      label: 'View Students',
      badge: studentCount,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'add-student',
      label: 'Add Student',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      )
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        {/* Brand header */}
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>
          <div className="sidebar__brand-text">
            <h2>EduTrack</h2>
            <span>Student Portal</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="sidebar__nav">
          <div className="sidebar__section-label">MAIN NAVIGATION</div>
          <ul className="sidebar__menu">
            {navItems.map((item) => {
              const isActive = activeTab === item.id || (item.id === 'view-students' && activeTab === 'edit-student');
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="sidebar__link-icon">{item.icon}</span>
                    <span className="sidebar__link-text">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="sidebar__badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">AD</div>
            <div className="sidebar__user-info">
              <strong>Admin User</strong>
              <span>Academic Office</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
