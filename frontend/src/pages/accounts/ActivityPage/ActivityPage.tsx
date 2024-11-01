import React, { useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { DateTime } from 'luxon';
import Rating from '@mui/material/Rating';
import './ActivityPage.css'; // Styling for activity-specific layout
import UserNavBar from '../UserNavbar';

const ActivityPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [username, setUsername] = useState<string>('User');
  const [userActivities, setUserActivities] = useState([]);
  const [friendsActivities, setFriendsActivities] = useState([]);
  const location = useLocation();
  const [expandedActivityIds, setExpandedActivityIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/${id}`);
        const fetchedUsername = response.data.name;
        setUsername(user && user.name === response.data.name ? 'You' : fetchedUsername);
      } catch (error) {
        console.error("Error fetching username", error);
      }
    };
    fetchUsername();
  }, [id, user]);

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/userId/${id}/activity`);
      setUserActivities(response.data);
    } catch (error) {
      console.error("Error fetching user activities", error);
    }
  };

  const fetchFriendsActivities = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/userId/${id}/friends/activity`);
      console.log(response.data);
      setFriendsActivities(response.data);
    } catch (error) {
      console.error("Error fetching friends' activities", error);
    }
  };

  useEffect(() => {
    if (location.pathname === `/u/${id}/activity` || location.pathname === `/u/${id}/activity/`) {
      fetchUserActivities();
    } else if (location.pathname === `/u/${id}/activity/friends`) {
      fetchFriendsActivities();
    }
  }, [location.pathname, id]);

  const toggleExpansion = (activityId: number) => {
    setExpandedActivityIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(activityId) ? newSet.delete(activityId) : newSet.add(activityId);
      return newSet;
    });
  };

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
            <Route
              path=""
              element={
                <div className="activity-page-contentlist">
                  <ul className="activity-page-ul">
                    {userActivities.map((activity: any, index: number) => (
                      <li key={index} className="activity-item">
                        <div className="activity-item-header">
                          <span className="activity-item-perp">You</span> {activity.rating ? 'reviewed' : 'commented on'} <span className="activity-item-vict">{activity.mediaTitle}</span>
                          {activity.rating && (
                            <Rating
                              size="small"
                              value={activity.rating}
                              precision={0.5}
                              readOnly
                              sx={{ ml: 1 }}
                            />
                          )}
                        </div>
                        <div className="activity-item-dates">
                          <span className="activity-relative-date">
                            {DateTime.fromJSDate(new Date(activity.dateCreated)).toRelative()}
                          </span>
                          <span className="activity-absolute-date">
                            {DateTime.fromJSDate(new Date(activity.dateCreated)).toLocaleString(DateTime.DATETIME_MED)}
                          </span>
                        </div>
                        <div className={`activity-item-body ${expandedActivityIds.has(activity.id) ? 'expanded' : 'collapsed'}`}>
                          {activity.body}
                        </div>
                        {((activity.body.split('\n').length > 1) || (activity.body.length > 120)) && (
                          <button
                            onClick={() => toggleExpansion(activity.id)}
                            className="activity-item-toggle-button"
                          >
                            {expandedActivityIds.has(activity.id) ? 'See Less' : 'See More'}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <Route
              path="friends"
              element={
                <div className="activity-page-contentlist">
                  <ul className="activity-page-ul">
                    {friendsActivities.map((activityWithUser: any, index: number) => (
                      <li key={index} className="activity-item">
                        <div className="activity-item-header">
                          <span className="activity-item-perp">{activityWithUser.userName}</span> {activityWithUser.activity.rating ? 'reviewed' : 'commented on'} <span className="activity-item-vict">{activityWithUser.activity.mediaTitle}</span>
                          {activityWithUser.activity.rating && (
                            <Rating
                              size="small"
                              value={activityWithUser.activity.rating}
                              precision={0.5}
                              readOnly
                              sx={{ ml: 1 }}
                            />
                          )}
                        </div>
                        <div className="activity-item-dates">
                          <span className="activity-relative-date">
                            {DateTime.fromJSDate(new Date(activityWithUser.activity.dateCreated)).toRelative()}
                          </span>
                          <span className="activity-absolute-date">
                            {DateTime.fromJSDate(new Date(activityWithUser.activity.dateCreated)).toLocaleString(DateTime.DATETIME_MED)}
                          </span>
                        </div>
                        <div className={`activity-item-body ${expandedActivityIds.has(activityWithUser.activity.id) ? 'expanded' : 'collapsed'}`}>
                          {activityWithUser.activity.body}
                        </div>
                        {activityWithUser.activity.body.split('\n').length > 1 && (
                          <button
                            onClick={() => toggleExpansion(activityWithUser.activity.id)}
                            className="activity-item-toggle-button"
                          >
                            {expandedActivityIds.has(activityWithUser.activity.id) ? 'See Less' : 'See More'}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;