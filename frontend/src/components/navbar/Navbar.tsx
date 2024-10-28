import "./Navbar.css";

import SearchBox from '../../components/SeachBox'
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import DropdownMenu from './av-dropdown-menu/DropdownMenu';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [searchQuery, setSearchQuery] = useState('');
  const isHome = location.pathname === '/'

  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  useEffect(() => {
    async function setData() {
      try {
        // YOU CAN GET RID OF THIS CODE ONCE EVERYONE HAS A DEFAUL PROFILE PIC
        const userRes = await axios.post('http://localhost:8080/api/user/', user);
        await axios.post('http://localhost:8080/api/user/setPicture', null,
          {
            params: {
              id: userRes.data[0].id,
              picture: user.picture
            }
          }
        );
        setLoggedInUserId(userRes.data[0].id)
      } catch (error) {
        console.error('Error setting data', error);
      }
    }

    if (isAuthenticated && user) {
      setData();
    }

  }, [isAuthenticated])

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate('/search', {
      state: {
        searchQuery: searchQuery,
      },
    });
  }

  const handleSearchSubmitOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const toggleAvatarDropdown = () => {
    setAvatarDropdownOpen(!avatarDropdownOpen);
  };

  return (!isHome || isAuthenticated) && (
    <>
      <div className="bar">
        <nav>
          <ul className="desktop-nav">
            <li className="nav-logo-li">
              <a href="/" className="nav-logo">
              </a>
            </li>
            <li className="nav-search-li">
              <SearchBox
                searchQuery={searchQuery}
                placeholder='Search content'
                onSearchInputChange={handleSearchInputChange}
                onSearchSubmit={handleSearchSubmit}
                onSearchSubmitOnEnter={handleSearchSubmitOnEnter}
              />
            </li>
            <li onClick={() => navigate(`/u/${loggedInUserId}/content`)} className="nav-item-li nav-click">
              Content
            </li>
            <li onClick={() => navigate(`/u/${loggedInUserId}/friends`)} className="nav-item-li nav-click">
              Friends
            </li>
            <li className="nav-avatar-li">
              {user ? (<>
                <Avatar src={user.picture} alt={user.name} style={{ cursor: 'pointer', width: '35px', height: '35px' }} onClick={() => toggleAvatarDropdown()} />
                {avatarDropdownOpen && <DropdownMenu userId={loggedInUserId} closeDropdown={() => setAvatarDropdownOpen(false)} />}
              </>
              ) :
                (<AccountCircleIcon />)}

            </li>
          </ul>
        </nav>
      </div>
      <div className="nav-gradient"></div>
    </>
  );
};

export default Navbar;
