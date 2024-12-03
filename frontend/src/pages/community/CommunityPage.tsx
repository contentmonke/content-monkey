
import "./CommunityPage.css"
import SearchBox from "../../components/SeachBox";
import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import MyGroups from "./my-groups/MyGroups";
import PopularGroups from "./popular-groups/PopularGroups";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../reviews/review-utils";
import { SmallLoading } from "../../components/Loading";
import CommunitySideBar from "./sidebar/CommunitySideBar";
import { useNavigate } from "react-router-dom";
import { Group } from "../../models/Models";
import { fetchMyGroups, fetchPopularGroups } from "./community-utils";

function CommunityPage() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [groupSearch, setGroupSearch] = useState("");
  const [myGroups, setMyGroups] = useState<Group[] | undefined>(undefined);
  const [popularGroups, setPopularGroups] = useState<Group[] | undefined>(undefined);
  const [userData, setUserData] = useState<any | undefined>(undefined);

  // Fetch user info
  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  // Fetch groups
  useEffect(() => {
    if (userData?.id === undefined) {
      return;
    }
    fetchMyGroups(userData.id, setMyGroups);
    fetchPopularGroups(setPopularGroups);
  }, [userData?.id]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    navigate('/community/search', {
      state: {
        groupSearch: groupSearch,
      },
    });
    setGroupSearch("");
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }

  return (
    <div className="community-page">
      <CommunitySideBar />
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
        {userData !== undefined ?
          <>
            <MyGroups myGroups={myGroups} />
            <PopularGroups
              popularGroups={popularGroups}
              userId={userData.id}
            />
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

export default CommunityPage;