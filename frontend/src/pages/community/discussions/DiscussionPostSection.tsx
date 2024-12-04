import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Avatar, Button, Container, Divider, IconButton, Rating, Typography } from "@mui/material";
import { reviewDetail } from "../../../style/media-page";
import { ReviewDTO } from "../../../models/Models";
// import "./MediaPage.css";
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { useEffect, useState } from "react";
// import Comments from "./../Comments";
import { DateTime } from 'luxon';
import { formatDate } from "../../upload/upload-utils";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser, updateDownVotes, updateUpVotes } from "../../reviews/review-utils";
import { Post } from "../../../models/Models";
import DiscussionPostComments from "./DiscussionPostComments";
import { DiscussionComment } from "../../../models/Models";

type params = {
  posts: Post[];
  setNeedsUpdate: any;
  setPosts: any;
}

function DiscussionPostSubsection({ posts, setNeedsUpdate, setPosts }: params) {

  // const [openComments, setOpenComments] = useState([]);
  const { user } = useAuth0();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [openComments, setOpenComments] = useState(null);
  const [comments, setComments] = useState<DiscussionComment[] | null>(null);
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  useEffect(() => {

  }, [comments])

  const handleCommentClick = (reviewIndex) => {
    setOpenComments(reviewIndex)
  }

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          <Divider />
          <Container disableGutters sx={{ display: 'flex', my: 1 }}>
            <div className="user-info">
              <Avatar src={post.picture ? post.picture : 'https://via.placeholder.com/150'} alt={post.username} style={{ marginBottom: '5px', width: '35px', height: '35px', marginRight: '10px' }}/>
              <Typography variant="caption">{post.username}</Typography>
            </div> 
            <Container disableGutters sx={{ ...reviewDetail }}>
              <div className="rating-date">
                <div className="text">{DateTime.fromJSDate(new Date(post.postDate)).toRelative()}</div>
              </div>
              <div className="text">{post.postBody}</div>
              <div className="interactive-container">
                

                <Button
                  variant="text"
                  onClick={() => handleCommentClick(index)}>
                  <ModeCommentRoundedIcon sx={{ width: 15, color: 'grey', marginRight: '5px' }} />
                  <div className="text">{post.commentIds.length} comments</div>
                </Button>
              </div>
              <DiscussionPostComments
                commentIds={post.commentIds}
                open={openComments === index}
                postId={post.id}
                setNeedsUpdate={setNeedsUpdate}
                setComments={setComments}
                comments={comments}
                setPosts={setPosts}
              />
            </Container>
          </Container>
        </div>
      ))}
    </>
  );
}

export default DiscussionPostSubsection