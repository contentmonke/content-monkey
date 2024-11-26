import { Divider } from "@mui/material";

import "./PopularGroups.css"
import { longMockGroups, shortMockGroups } from "../my-groups/mock-groups";
import GroupResults from "../group-results/GroupResults";
import { useNavigate } from "react-router-dom";

function PopularGroups({ userId }: any) {
  const navigate = useNavigate();

  const handleBrowseAllClick = () => {
    navigate("/community/popular");

  }

  return (
    <div className="popular-groups">
      <div className="popular-groups-header">
        <h5 className="my-groups-title">Popular Groups</h5>
        <button
          className="browse-all-button"
          onClick={handleBrowseAllClick}
        >
          Browse All
        </button>
      </div>
      <Divider />
      <div className="popular-groups-content">
        <GroupResults
          groups={longMockGroups}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default PopularGroups;