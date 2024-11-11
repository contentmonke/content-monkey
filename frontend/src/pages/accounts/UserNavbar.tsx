import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserNavbar.css';

const UserNavBar: React.FC = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Use to programmatically navigate
  
  // Extract the base path and user ID from the current URL (assuming it follows /u/{id}/...)
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2]; // Get the second part of the path, which is the user ID

  // State for storing user details
  const [username, setUsername] = useState<string>('');
  const [userProfilePicture, setUserProfilePicture] = useState<string>('');

  // Fetch user details based on userId
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
        
        // Assuming userResponse.data contains user information
        const profilePic = userResponse.data.picture; // Profile picture URL

        setUserProfilePicture(profilePic);
        setUsername(userResponse.data.username);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Run the effect whenever the userId changes

  // Navigate to the user's profile page when the profile picture or name is clicked
  const handleProfileClick = () => {
    navigate(`/u/${userId}`);
  };

  return (
    <div className="user-navbar-container">
      <div className="user-navbar">
        <div className="user-navbar-user" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <img
            src={userProfilePicture || "https://example.com/default-avatar.png"} // Default profile pic if not available
            alt="User Avatar"
            className="user-navbar-avatar"
          />
          <span className="user-navbar-username">{username || "User"}</span>
        </div>

        <ul className="user-navbar-menu">
          <li>
            <NavLink
              to={`/u/${userId}/activity`} // Navigate to /u/{id}/activity
              className={({ isActive }) => (isActive ? 'user-navbar-active' : '')}
            >
              Activity
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/u/${userId}/friends`} // Navigate to /u/{id}/friends
              className={({ isActive }) => (isActive ? 'user-navbar-active' : '')}
            >
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/u/${userId}/content`} // Navigate to /u/{id}/content
              className={({ isActive }) => (isActive ? 'user-navbar-active' : '')}
            >
              Content
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavBar;