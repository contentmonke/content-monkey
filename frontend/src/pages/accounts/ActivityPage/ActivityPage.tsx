import React, { useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './ActivityPage.css'; // Similar to ContentPage.css but with activity-specific class names
import UserNavBar from '../UserNavbar';

const ActivityPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [username, setUsername] = useState<string>('User');
  const location = useLocation();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/${id}`);
        const fetchedUsername = response.data.name;
        setUsername(user && user.name === response.data.name ? 'You' : fetchedUsername); // Set to "You" if current user
      } catch (error) {
        console.error("Error fetching username", error);
      }
    };
    fetchUsername();
  }, [id, user]);

  return (
    <div className="activity-page-container">
      <UserNavBar />
      <div className="activity-page-tabs-container">
        <div className="activity-page-tabs-header">
          <Link to={`/u/${id}/activity`} className={`activity-page-tab-item ${location.pathname === `/u/${id}/activity` ? 'active' : ''}`}>
            {username}
          </Link>
          <Link to={`/u/${id}/activity/friends`} className={`activity-page-tab-item ${location.pathname === `/u/${id}/activity/friends` ? 'active' : ''}`}>
            Friends
          </Link>
        </div>
        <div className="activity-page-tab-content">
          <Routes>
            <Route path="/" element={
              <div className="activity-page-contentlist">
                <p>Displaying {username}'s activity here.</p>
                {/* Activity content would go here */}
              </div>
            } />
            <Route path="friends" element={
              <div className="activity-page-contentlist">
                <p>Displaying {username}'s friends here.</p>
                {/* Friends content would go here */}
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;