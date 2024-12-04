import { useEffect, useState } from "react";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import { SmallLoading } from "../../../components/Loading";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import "./DiscussionPage.css"
import { fetchDiscussionPosts, fetchDiscussionBoard } from "./discussion-utils";
import { Post } from "../../../models/Models";
import DiscussionPostSubsection from "./DiscussionPostSection";
import CreateDiscussionPostButton from "./CreateDiscussionPostButton";

function DiscussionPage() {
  const { user } = useAuth0();
  const { discussionId } = useParams();
  const [discussion, setDiscussion] = useState<any | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [needsUpdate, setNeedsUpdate] = useState(true);


  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    fetchDiscussionPosts(discussionId, setPosts)
    fetchDiscussionBoard(discussionId, setDiscussion)

  }, [user?.name]);


  return (
    <>
      <div className="discussion-page">
        <CommunitySideBar />
        {discussion !== null && userData !== undefined ?
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
              <KeyboardArrowRightIcon
                sx={{ fontSize: '30px', marginTop: '1px' }}
              />
              <h3>{discussion.title}</h3>

            </div>
            {posts !== null && discussion !== null &&
              <div>
                <DiscussionPostSubsection posts={posts} setPosts={setPosts} setNeedsUpdate={setNeedsUpdate}></DiscussionPostSubsection>
                <CreateDiscussionPostButton
                  discussionBoardId={discussionId}
                  setNeedsUpdate={setNeedsUpdate}
                  setPosts={setPosts} />
              </div>
            }


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