// SearchAndExplore.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../../../components/SeachBox'; // Import the new SearchBox component

function SearchAndExplore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="s-and-e">
      <div className="make-search">
        OR MAKE A SEARCH
      </div>

      <div className="search-box">
        <SearchBox
          searchQuery={searchQuery}
          placeholder='Make a search for a movie, TV show, video game, or book'
          inputWidth='59ch'
          onSearchInputChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchSubmitOnEnter={handleSearchSubmitOnEnter}
        />
      </div>
    </div>
  );
}

export default SearchAndExplore;