import "./Navbar.css";

import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import DropdownMenu from './av-dropdown-menu/DropdownMenu';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [searchQuery, setSearchQuery] = useState('');

  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  useEffect(() => {
    async function setData() {
      try {
        // YOU CAN GET RID OF THIS CODE ONCE EVERYONE HAS A DEFAULT PROFILE PIC
        const userRes = await axios.post('http://localhost:8080/api/user/', user);
        await axios.post('http://localhost:8080/api/user/setPicture', null,
          { params: {
            id: userRes.data[0].id,
            picture: user.picture
          }}
        );
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

  return isAuthenticated && (
    <>
      <div className="bar">
        <nav>
          <ul className="desktop-nav">
            <li className="nav-logo-li">
              <a href="/" className="nav-logo">
              </a>
            </li>
            <li className="nav-search-li">
              <Search>
                <SearchIconWrapper onClick={handleSearchSubmit}>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search content"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleSearchSubmitOnEnter}
                />
              </Search>
            </li>
            <li className="nav-item-li">
              Item
            </li>
            <li className="nav-item-li">
              Item
            </li>
            <li className="nav-item-li">
              Item
            </li>
            <li className="nav-item-li">
              Item
            </li>
            <li className="nav-item-li">
              Item
            </li>
            <li className="nav-avatar-li">
              {user ? (<>
                <Avatar src={user.picture} alt={user.name} style={{ cursor: 'pointer', width: '35px', height: '35px' }} onClick={() => toggleAvatarDropdown()} />
                {avatarDropdownOpen && <DropdownMenu closeDropdown={() => setAvatarDropdownOpen(false)} />}
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
