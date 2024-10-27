import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './SettingsSidebar.css'; // Custom CSS for sidebar

const SettingsSidebar: React.FC = () => {
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // For programmatically navigating

  // Redirect to /settings/profile if the path is exactly /settings
  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('/settings/profile');
    }
  }, [location.pathname, navigate]);

  return (
    <aside className="settings-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/settings/profile"
              className={location.pathname === '/settings/profile' ? 'settings-active' : 'settings-side'}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings/account"
              className={location.pathname === '/settings/account' ? 'settings-active' : 'settings-side'}
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings/appearance"
              className={location.pathname === '/settings/appearance' ? 'settings-active' : 'settings-side'}
            >
              Password and authentication
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings/integrations"
              className={location.pathname === '/settings/integrations' ? 'settings-active' : 'settings-side'}
            >
              Integrations
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SettingsSidebar;