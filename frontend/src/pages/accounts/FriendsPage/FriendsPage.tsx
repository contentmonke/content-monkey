import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import UserNavBar from '../UserNavbar';
import SearchBox from '../../../components/SeachBox';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Button from '../../../components/button/Button';
import './FriendsPage.css';

const FriendsPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (index: number) => setActiveTab(index);

  async function fetchData() {
    try {
      const friendsList = await axios.get(`http://localhost:8080/api/user/friend_list/${id}`);
      setFriends(friendsList.data);

      const requestList = await axios.get(`http://localhost:8080/api/user/friend_requests/${id}`);
      setRequests(requestList.data);

      const currUserResponse = await axios.post("http://localhost:8080/api/user/", user);
      setLoggedInUserId(currUserResponse.data[0].id);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement search submit logic here
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleAcceptRequest = async (from: number, index: number) => {
    try {
      await axios.post(`http://localhost:8080/api/user/friend_accept/${from}/${id}?decision=true`);
      setRequests(requests.filter((_, i) => i !== index));
    } catch (err) {
      console.log("Error accepting friend request", err);
    }
    fetchData();
  };

  const handleDeclineRequest = async (from: number, index: number) => {
    try {
      await axios.post(`http://localhost:8080/api/user/friend_accept/${from}/${id}?decision=false`);
      setRequests(requests.filter((_, i) => i !== index));
    } catch (err) {
      console.log("Error declining friend request", err);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [id, user]);

  return (
    <div className="friends-page-container">
      <UserNavBar />
      <div className="friends-page-content">
        <div className="friends-page-search">
          <SearchBox
            searchQuery={searchQuery}
            onSearchInputChange={handleSearchInputChange}
            onSearchSubmit={handleSearchSubmit}
            inputWidth="25ch"
            placeholder="Search users..."
          />
        </div>
        <div className="tabs-container">
          <div className="tabs-header">
            <div className={`tab-item ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabChange(0)}>
              Friends
            </div>
            {parseInt(String(loggedInUserId)) === parseInt(id) && (
              <div className={`tab-item ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabChange(1)}>
                Requests
              </div>
            )}
            <div className={`tab-item ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabChange(2)}>
              Blocked
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 0 && (
              <ul className="friends-list">
                {friends.map((f: any, i: number) => (
                  <li key={i} className="friend-item">{f.name}</li>
                ))}
              </ul>
            )}
            {activeTab === 1 && parseInt(String(loggedInUserId)) === parseInt(id) && (
              <ul className="requests-list">
                {requests.map((r: any, i: number) => (
                  <li key={i} className="request-item">
                    {r.name}
                    <div className="request-icons">
                      <CheckCircle
                        onClick={() => handleAcceptRequest(r.id, i)}
                        style={{ color: '#4caf50', cursor: 'pointer' }}
                      />
                      <Cancel
                        onClick={() => handleDeclineRequest(r.id, i)}
                        style={{ color: '#FF3E3E', cursor: 'pointer' }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 2 && (
              <div className="blocked-content">
                <p>No blocked users yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;