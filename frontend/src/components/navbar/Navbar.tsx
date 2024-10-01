import "./Navbar.css";

import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth0 } from '@auth0/auth0-react';

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
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  const { isAuthenticated } = useAuth0();

  return isAuthenticated && (
    <div className="bar">
      <nav>
        <ul className="desktop-nav">
          <li>
            <a href="/" className="nav-logo">
            </a>
          </li>
          <li>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search content"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </li>
          <li>
            Item
          </li>
          <li>
            Item
          </li>
          <li>
            Item
          </li>
          <li>
            Item
          </li>
          <li>
            Item
          </li>
          <li>
            Item
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
