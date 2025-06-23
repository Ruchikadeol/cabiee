import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROLE_ACCESS } from '../constant/UserRole';
import { Logout, Dashboard, Group, People, LocalTaxi, History, Commute, Business } from '@mui/icons-material';


const ICONS = {
  dashboard: <Dashboard />,
  employees: <People />,
  groups: <Group />,
  tender: <LocalTaxi />,
  history: <History />,
  rides: <Commute />,
  organisation: <Business />, 
};


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "admin";
  const accessibleItems = ROLE_ACCESS[userRole] || [];

  const handleResize = () => setIsMobile(window.innerWidth < 700);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  if (isMobile) return null; // Don’t show sidebar on mobile, it’s handled in Header

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <ul className="menu-list">
          {accessibleItems.map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {ICONS[item] || '📁'}
                {!isCollapsed && (
                  <span className="menu-text">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '>>' : 'Hide Sidebar <<'}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          <Logout />
          {!isCollapsed && <span className="menu-text">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
