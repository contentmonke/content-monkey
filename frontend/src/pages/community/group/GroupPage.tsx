import { useNavigate, useParams } from "react-router-dom";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import { SmallLoading } from "../../../components/Loading";
import { useEffect, useState } from "react";
import { DiscussionBoard, Group } from "../../../models/Models";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import "./GroupPage.css";
import { getRelativeDateString } from "../../media/media-utils";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider } from "@mui/material";
import { DiscussionButton, InviteButton, JoinButton, LeaveButton, RequestButton } from "../action-buttons/GroupButtons";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { fetchGroup, fetchGroupDiscussionBoards, joinGroup, leaveGroup } from "../community-utils";
import InviteModal from "../invitations/InviteModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function GroupPage() {
  const { user } = useAuth0();
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [discussionBoards, setDiscussionBoards] = useState<DiscussionBoard[] | null>(null);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    fetchGroup(parseInt(groupId!, 10), setGroup);
    fetchGroupDiscussionBoards(groupId, setDiscussionBoards);
  }, [user?.name]);

  const handleJoinClick = () => {
    console.log("join")
    joinGroup(parseInt(groupId, 10), userData.id, setGroup);
  }

  const handleRequestClick = () => {
    console.log("request")
    handleJoinClick();
  }

  const handleLeaveClick = () => {
    console.log("leave")
    leaveGroup(parseInt(groupId, 10), userData.id, setGroup);
  }

  const handleInviteClick = () => {
    console.log("invite")
    setInviteOpen(true);
  }

  const handleManageGroup = () => {
    navigate(`/community/manage-group/${groupId}`);
  }

  const handleClickDiscussion = (groupId, discussionId) => {
    navigate(`/community/group/${groupId}/discussion/${discussionId}`);
  };

  return (
    <>
      <div className="group-page">
        <CommunitySideBar />
        {group !== undefined && userData !== undefined ?
          <div className="group-content">
            <div className="group-page-title">
              <div className="title-path">
                <h3
                >Communities</h3>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: '30px', marginTop: '1px' }}
                />
                <h3>Groups</h3>
              </div>
              {userData?.id === group?.owner &&
                <div className="owner-controls-container">
                  <button
                    className="owner-button"
                    onClick={() => handleManageGroup()}
                  >
                    <MoreVertIcon />
                  </button>
                </div>
              }
            </div>
            <div className="group-header">
              <div className="group-button-column">
                <div className="group-img-container">
                  <img
                    className={(!group.isPublic && !group.members.includes(userData.id)) ? "group-img-locked" : "group-img"}
                    src={group.picture || 'https://via.placeholder.com/150'}
                  />
                  <div className="group-lock">
                    {!group.isPublic && group.members.includes(userData.id) &&
                      <LockOpenIcon sx={{ fontSize: 40 }} />
                    }
                    {!group.isPublic && !group.members.includes(userData.id) &&
                      <LockIcon sx={{ fontSize: 40 }} />
                    }
                  </div>
                </div>
                <JoinButton
                  group={group}
                  userId={userData.id}
                  handleClick={handleJoinClick}
                />
                <LeaveButton
                  group={group}
                  userId={userData.id}
                  handleClick={handleLeaveClick}
                />
                <RequestButton
                  group={group}
                  userId={userData.id}
                  handleClick={handleRequestClick}
                />
                <InviteButton
                  group={group}
                  userId={userData.id}
                  handleClick={handleInviteClick}
                />
              </div>
              <div className="group-info">
                <h4 className="group-title">{group.groupName}</h4>
                <div className="group-members">{group.members.length} Members &mdash; Created {getRelativeDateString(new Date(group.dateCreated))}</div>
                <br />
                <div>{group.description}</div>
              </div>
            </div>
            <br />
            {discussionBoards !== null && group !== undefined && userData !== undefined && group.members.includes(userData.id) &&
              <div>
                <h5 className="discussion-title">Discussion Boards</h5>


                  {discussionBoards.map((board) => (
                    <li className="discussion-list-item" key={board.id} onClick={() => handleClickDiscussion(userData.id, board.id)}>
                      <div>
                        <span className="discussion-item-title">{board.title} </span>
                        <span className="group-members"> &mdash; {board.post_ids.length} {board.post_ids.length === 1 ? "Post" : "Posts"}</span>
                      </div>
                      <div></div>
                    </li>
                  ))}
              </div>
            }
            <Divider />
          </div>
          :
          <div className="loading-container">
            <SmallLoading />
          </div>
        }
        {userData !== undefined && <InviteModal
          groupId={groupId}
          inviterId={userData.id}
          open={inviteOpen}
          setInviteOpen={setInviteOpen}
        />}
      </div>
    </>
  );
}

export default GroupPage;