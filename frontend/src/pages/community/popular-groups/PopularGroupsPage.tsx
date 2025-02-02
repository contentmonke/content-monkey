
import GroupResults from "../group-results/GroupResults";
import { Group } from "../../../models/Models";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import SearchBox from "../../../components/SeachBox";
import Button from "../../../components/button/Button";
import { SmallLoading } from "../../../components/Loading";
import "../CommunityPage.css"
import CustomPagination from "../../../components/CustomPagination";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fetchPopularGroups } from "../community-utils";

function PopularGroupsPage() {
  const [groupSearch, setGroupSearch] = useState("");
  const { user } = useAuth0();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [popularGroups, setPopularGroups] = useState<Group[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch user info
  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    fetchPopularGroups(setPopularGroups);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }

  return (
    <>
      <div className="community-page">
        <CommunitySideBar />
        <div className="community-content">
          <div className="community-page-title">
            <h3
            >Communities</h3>
            <KeyboardArrowRightIcon
              sx={{ fontSize: '30px', marginTop: '1px' }}
            />
            <h3>Popular Groups</h3>
          </div>
          <div className="community-search">
            <div className="community-search-bar">
              <SearchBox
                searchQuery={groupSearch}
                onSearchInputChange={handleInputChange}
                onSearchSubmit={handleSearchSubmit}
                onSearchSubmitOnEnter={handleSearchEnter}
                placeholder="Search popular groups"
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
          <br />
          {userData !== undefined && popularGroups !== undefined ?
            <>
              {popularGroups.length === 0 ?
                <div className="my-groups-empty-message">
                  <div className="">No groups yet</div>
                </div>
                :
                <>
                  <GroupResults
                    groups={popularGroups?.slice((page-1)*10, page*10)}
                    userId={userData.id}
                  />
                  <CustomPagination
                    scrollRef={scrollRef}
                    items={popularGroups}
                    page={page}
                    handlePageChange={handlePageChange}
                  />
                </>
              }
            </>
            :
            <div className="loading-container">
              <SmallLoading />
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default PopularGroupsPage;