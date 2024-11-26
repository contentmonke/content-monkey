import { useEffect, useState } from "react";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import { SmallLoading } from "../../../components/Loading";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import "./DiscussionPage.css"

function DiscussionPage() {
  const { user } = useAuth0();
  const { discussionId } = useParams();
  const [discussion, setDiscussion] = useState("hi");
  const [userData, setUserData] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    // fetchDiscussion();
  }, [user?.name]);

  return (
    <>
      <div className="discussion-page">
        <CommunitySideBar />
        {discussion !== undefined && userData !== undefined ?
          <div className="discussion-content">
            <div className="discussion-page-title">
              <h3
              >Communities</h3>
              <KeyboardArrowRightIcon
                sx={{ fontSize: '30px', marginTop: '1px' }}
              />
              <h3>Groups</h3>
              <KeyboardArrowRightIcon
                sx={{ fontSize: '30px', marginTop: '1px' }}
              />
              <h3>Discussion</h3>
            </div>
          </div>
          :
          <div className="loading-container">
            <SmallLoading />
          </div>
        }
      </div></>
  );
}

export default DiscussionPage;