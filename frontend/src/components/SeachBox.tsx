import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles'; // Import Theme and styled from the right place
import { Theme } from '@mui/material'; // Import Theme from MUI core

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
    width: 'auto',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

interface SearchBoxProps {
  searchQuery: string;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
  onSearchSubmitOnEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputWidth?: string; // Optional prop to control width
  placeholder?: string; // Optional prop to control the placeholder text
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  onSearchInputChange,
  onSearchSubmit,
  onSearchSubmitOnEnter,
  inputWidth = '30ch', // Default width if not provided
  placeholder = 'Search...', // Default placeholder if not provided
}) => {
  return (
    <Search>
      <SearchIconWrapper onClick={onSearchSubmit}>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBase
        placeholder={placeholder} // Use the placeholder prop here
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={onSearchInputChange}
        onKeyDown={onSearchSubmitOnEnter}
        sx={{
          color: 'inherit',
          '& .MuiInputBase-input': (theme: Theme) => ({
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
              width: inputWidth, // Dynamic width via prop
            }
          }),
        }}
      />
    </Search>
  );
};

export default SearchBox;