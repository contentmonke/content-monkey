
import "./CommunityPage.css"
import SearchBox from "../../components/SeachBox";
import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import MyGroups from "./my-groups/MyGroups";
import PopularGroups from "./popular-groups/PopularGroups";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../reviews/review-utils";
import { Loading, SmallLoading } from "../../components/Loading";
import CommunitySideBar from "./sidebar/CommunitySideBar";

function CommunityPage() {
  const [groupSearch, setGroupSearch] = useState("");
  const { user } = useAuth0();
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
    // reroute
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <>
      <div className="community-page">
        <CommunitySideBar />
        {userData !== undefined ?
          <div className="community-content">
            <h3 className="community-page-title">Explore our Communities</h3>
            <div className="community-search">
              <div className="community-search-bar">
                <SearchBox
                  searchQuery={groupSearch}
                  onSearchInputChange={handleInputChange}
                  onSearchSubmit={handleSearchSubmit}
                  onSearchSubmitOnEnter={handleSearchEnter}
                  placeholder="Search groups"
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
            <MyGroups />
            <PopularGroups userId={userData.id} />
          </div>
          :
          <div className="loading-container">
            <SmallLoading />
          </div>
        }
      </div>
    </>
  );
}

export default CommunityPage;