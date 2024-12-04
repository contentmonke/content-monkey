import { Divider } from "@mui/material";
import GroupResults from "../group-results/GroupResults";
import { useNavigate } from "react-router-dom";
import "./PopularGroups.css"

function PopularGroups({ popularGroups, userId }: any) {
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
          groups={popularGroups.slice(0, 10)}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default PopularGroups;