import Button from "../../../../components/button/Button";
import SearchBox from "../../../../components/SeachBox";
import "../../CommunityPage.css"
import "../InviteModal.css";

function SearchBar({ searchTerm, setSearchTerm, searchUser }: any) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () => {
    searchUser();
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <div className="community-search">
      <div className="community-search-bar">
        <SearchBox
          searchQuery={searchTerm}
          onSearchInputChange={handleInputChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchSubmitOnEnter={handleSearchEnter}
          placeholder="Search for users"
        />
      </div>
      <div className="community-search-button">
        <Button
          onClick={handleSearchSubmit}
          label={"Search"}
          width={'120px'}
        />
      </div>
    </div>
  );
}

export default SearchBar;