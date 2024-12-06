import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './CommunitySideBar.css'; // Custom CSS for sidebar

const CommunitySideBar: React.FC = () => {
  const location = useLocation(); // Get the current location (route)
  const navigate = useNavigate(); // For programmatically navigating

  // Redirect to /settings/profile if the path is exactly /settings
  useEffect(() => {
    if (location.pathname === '/community') {
      navigate('/community/explore');
    }
  }, [location.pathname, navigate]);

  return (
    <aside className="settings-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/community/explore"
              className={location.pathname === '/community/explore' ? 'settings-active' : 'settings-side'}
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community/my-groups"
              className={location.pathname === '/community/my-groups' ? 'settings-active' : 'settings-side'}
            >
              My Groups
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community/popular"
              className={location.pathname === '/community/popular' ? 'settings-active' : 'settings-side'}
            >
              Popular Groups
            </NavLink>
          </li>
          <br />
          <br />
          <li>
            <NavLink
              to="/community/create-group"
              className={location.pathname === '/community/create-group' ? 'settings-active' : 'settings-side'}
            >
              Create A Group
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community/invitations"
              className={location.pathname === '/community/invitations' ? 'settings-active' : 'settings-side'}
            >
              Invitations
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default CommunitySideBar;