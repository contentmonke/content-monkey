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
    // setOpenComments(indices => [...indices, reviewIndex]);
    setOpenComments(reviewIndex)
  }

  const handleUpVote = (post: Post, addedVote: boolean) => {
    if (userData?.posts_disliked.includes(post.id)) {
      return;
    }
    console.log("Upvote");
    console.log("addedVote = " + addedVote);
    updateUpVotes(userData, post.id, addedVote, setUserData, setNeedsUpdate);
  }

  const handleDownVote = (post: Post, addedVote: boolean) => {
    if (userData?.posts_liked.includes(post.id)) {
      return;
    }
    console.log("Downvote");
    console.log("addedVote = " + addedVote);
    updateDownVotes(userData, post.id, addedVote, setUserData, setNeedsUpdate);
  }

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          <Divider />
          <Container disableGutters sx={{ display: 'flex', my: 1 }}>
            <div className="user-info">
              <Avatar src={post.picture ? post.picture : 'https://via.placeholder.com/150'} alt={post.username} style={{ marginBottom: '5px', width: '35px', height: '35px' }}/>
              <Typography variant="caption">{post.username}</Typography>
            </div> 
            <Container disableGutters sx={{ ...reviewDetail }}>
              <div className="rating-date">
                {/* <Rating
                  size={'small'}
                  sx={{ my: 0, mr: 1, mb: 0.5 }}
                  value={review.rating}
                  precision={0.5}
                  readOnly
                /> */}
                {/* <div className="text">{DateTime.fromJSDate(new Date(review.dateCreated).getHours() - 4).toRelative(}</div> */}
                <div className="text">{formatDate(post.postDate)}</div>
              </div>
              <div className="text">{post.postBody}</div>
              <div className="interactive-container">
                {/* <IconButton
                  size={'small'}
                  // disabled={!userData?.posts_liked.includes(review.id)}
                  onClick={() => handleUpVote(post, !userData?.posts_liked.includes(post.id))}
                >
                  <ThumbUp
                    sx={{
                      width: 15,
                      color: (userData?.posts_liked.includes(post.id) ? '#31628F' : 'grey')
                    }}
                  />
                </IconButton>
                <div className="text">{post.upVotes}</div>
                <IconButton
                  disabled={!userData}
                  onClick={() => handleDownVote(post, !userData?.posts_disliked.includes(post.id))}
                >
                  <ThumbDown
                    sx={{
                      width: 15,
                      color: (userData?.posts_disliked.includes(post.id) ? '#31628F' : 'grey')
                    }}
                  />
                </IconButton>
                <div className="text">{post.downVotes}</div> */}

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