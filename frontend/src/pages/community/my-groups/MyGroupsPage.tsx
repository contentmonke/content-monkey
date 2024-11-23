
import GroupResults from "../group-results/GroupResults";
import { Group } from "../../../models/Models";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import SearchBox from "../../../components/SeachBox";
import Button from "../../../components/button/Button";
import { SmallLoading } from "../../../components/Loading";
import { longMockGroups } from "./mock-groups";
import "../CommunityPage.css"
import CustomPagination from "../../../components/CustomPagination";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function MyGroupsPage() {
  const [groupSearch, setGroupSearch] = useState("");
  const { user } = useAuth0();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [groups, setGroups] = useState<Group[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    // fetchMyGroups();
    setGroups(longMockGroups);
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
        {userData !== undefined && groups !== undefined ?
          <div className="community-content">
            <div className="community-page-title">
              <h3
              >Communities</h3>
              <KeyboardArrowRightIcon
                sx={{ fontSize: '30px', marginTop: '1px' }}
              />
              <h3>My Groups</h3>
            </div>
            <div className="community-search">
              <div className="community-search-bar">
                <SearchBox
                  searchQuery={groupSearch}
                  onSearchInputChange={handleInputChange}
                  onSearchSubmit={handleSearchSubmit}
                  onSearchSubmitOnEnter={handleSearchEnter}
                  placeholder="Search my groups"
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
            <GroupResults
              groups={groups}
              userId={userData.id}
            />
            <CustomPagination
              scrollRef={scrollRef}
              items={groups}
              page={page}
              handlePageChange={handlePageChange}
            />
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

export default MyGroupsPage;