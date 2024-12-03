
import { useEffect, useState } from "react";
import "./SearchGroupsPage.css"
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import SearchBox from "../../../components/SeachBox";
import { useLocation, useNavigate } from "react-router-dom";
import { SmallLoading } from "../../../components/Loading";
import Button from "../../../components/button/Button";

function SearchGroupsPage() {
  const location = useLocation();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [groupSearch, setGroupSearch] = useState((location && location.state) ? location.state.groupSearch : "");
  const [userData, setUserData] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    // TODO
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <div className="group-search-page">
      <CommunitySideBar />
      <div className="group-search-content">
        <h3 className="group-search-page-title">Community Search</h3>
        <div className="group-search-search">
          <div className="group-search-search-bar">
            <SearchBox
              searchQuery={groupSearch}
              onSearchInputChange={handleInputChange}
              onSearchSubmit={handleSearchSubmit}
              onSearchSubmitOnEnter={handleSearchEnter}
              placeholder="Search groups"
            />
          </div>
          <div className="group-search-search-button">
            <Button
              onClick={handleSearchSubmit}
              label={"Search"}
              width={'120px'}
            />
          </div>
        </div>
        {userData !== undefined ?
          <>
          {/* TODO */}
          </>
          :
          <div className="loading-container">
            <SmallLoading />
          </div>
        }
      </div>
    </div>
  );
}

export default SearchGroupsPage;