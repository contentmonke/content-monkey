import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavBar from '../UserNavbar';
import SearchBox from '../../../components/SeachBox';
import Dropdown from '../../../components/SearchUserDropdown';
import ErrorAlert from '../../../components/ErrorAlert';
import './FriendsPage.css';
import { CheckCircle, Cancel, Delete } from '@mui/icons-material';


const FriendsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('username');
  const [searchResult, setSearchResult] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);


  const handleTabChange = (index: number) => setActiveTab(index);

  async function fetchData() {
    try {
      const friendsList = await axios.get(`http://localhost:8080/api/user/friend_list/${id}`);
      setFriends(friendsList.data);

      const blockedList = await axios.get(`http://localhost:8080/api/user/getBlockedUsers?userId=${id}`);
      console.log(blockedList);
      setBlockedUsers(blockedList.data);

      const requestList = await axios.get(`http://localhost:8080/api/user/friend_requests/${id}`);
      setRequests(requestList.data);

      const currUserResponse = await axios.post("http://localhost:8080/api/user/", user);
      setLoggedInUserId(currUserResponse.data[0].id);
    } catch (err) {
      setError('Error fetching data')
    }
  }

  const fetchUserByUsername = async (username: string) => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/username-search', {
        params: { username }
      });
      setSearchResult(response.data);
    } catch (err) {
      setError('Error fetching user by username');
      setIsError(true);
    }
  };

  const fetchUserById = async (id: string) => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/id-search', {
        params: { id }
      });
      setSearchResult(response.data);
    } catch (err) {
      setError('Error fetching user by ID');
      setIsError(true);
    }
  };

  const goToFriendProfile = (friendId: number) => {
    navigate(`/u/${friendId}`);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (selectedOption === 'id') {
      fetchUserById(searchQuery);
    } else {
      fetchUserByUsername(searchQuery);
    }
  };

  const handleSearchSubmitOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleAcceptRequest = async (from: number, index: number) => {
    try {
      await axios.post(`http://localhost:8080/api/user/friend_accept/${from}/${id}?decision=true`);
      setRequests(requests.filter((_, i) => i !== index));
    } catch (err) {
      setError('Error accepting friend request')
      setIsError(true);
    }
    fetchData();
  };

  const handleDeclineRequest = async (from: number, index: number) => {
    try {
      await axios.post(`http://localhost:8080/api/user/friend_accept/${from}/${id}?decision=false`);
      setRequests(requests.filter((_, i) => i !== index));
    } catch (err) {
      setError('Error declining friend request')
      setIsError(true);
    }
    fetchData();
  };

  const handleUnblockUser = async (blockedUser: string, index: number) => {
    try {
      await axios.post(`http://localhost:8080/api/user/unblockUser?userId=${id}&blockId=${blockedUser}`);
      setBlockedUsers(blockedUsers.filter((_, i) => i !== index));
      setSuccessMessage("User No Longer Blocked")
    } catch (err) {
      setError('Error unblocking user')
      setIsError(true);
    }
  };

  const handleOptionChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    fetchData();
  }, [id, user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="friends-page-container">
      <UserNavBar />
      <div className="friends-page-content">
        <div className="friends-page-search">
          <SearchBox
            searchQuery={searchQuery}
            onSearchInputChange={handleSearchInputChange}
            onSearchSubmit={handleSearchSubmit}
            onSearchSubmitOnEnter={handleSearchSubmitOnEnter}
            inputWidth="25ch"
            placeholder="Search users..."
          />
          <Dropdown onSelectChange={handleOptionChange} />
          {searchResult && searchResult.length > 0 ? (
            <ul className="friends-list">
              {searchResult.map((item, index) => (
                <li
                  key={index} // Unique key for each item
                  className="friend-item"
                  onClick={() => goToFriendProfile(item.id)} // Navigate on click
                  style={{ cursor: 'pointer' }} // Change cursor to indicate clickability
                >
                  {item.username} {/* Display the name directly from the array element */}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="friends-list">
              <li className="friend-item">
                No Results
              </li>
            </ul>
          )}

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
                  <li
                    key={i}
                    className="friend-item"
                    onClick={() => goToFriendProfile(f.id)} // Navigate on click
                    style={{ cursor: 'pointer' }} // Change cursor to indicate clickability
                  >
                    {f.username}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 1 && parseInt(String(loggedInUserId)) === parseInt(id) && (
              <ul className="requests-list">
                {requests.map((r: any, i: number) => (
                  <li key={i} className="request-item">
                    {r.username}
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
              <div className="tab-content">
                <ul className="friends-list">
                  {blockedUsers.map((f: any, i: number) => (
                    <li
                      key={i}
                      className="friend-item"
                      style={{ cursor: 'pointer' }} // Change cursor to indicate clickability
                    >
                      {f}
                      <Delete
                        onClick={() => handleUnblockUser(f, i)}
                        style={{ color: '#FF3E3E', cursor: 'pointer', marginLeft: '10px' }}
                      />
                    </li>
                  ))}
                </ul>
                {successMessage && (
                  <div className="success-message">
                    <p>{successMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ErrorAlert
        message={error}
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </div>
  );
};

export default FriendsPage;