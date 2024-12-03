import { useParams } from "react-router-dom";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import { SmallLoading } from "../../../components/Loading";
import { useEffect, useState } from "react";
import { Group } from "../../../models/Models";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import { longMockGroups, shortMockGroups } from "../my-groups/mock-groups";
import "./GroupPage.css";
import { getRelativeDateString } from "../../media/media-utils";
import cmLogo from '../../../assets/monkey.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider } from "@mui/material";
import Button from "../../../components/button/Button";
import { InviteButton, JoinButton, LeaveButton, RequestButton } from "../action-buttons/GroupButtons";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function GroupPage() {
  const { user } = useAuth0();
  const { groupId } = useParams();
  // const [group, setGroup] = useState<Group | undefined>(undefined);
  const [group, setGroup] = useState<Group | undefined>(longMockGroups[2]);
  const [userData, setUserData] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
    // fetchGroup();
  }, [user?.name]);

  const handleJoinClick = () => {
    // TODO
    console.log("join")
  }

  const handleRequestClick = () => {
    // TODO
    console.log("request")
  }

  const handleLeaveClick = () => {
    // TODO
    console.log("leave")
  }

  const handleInviteClick = () => {
    // TODO
    console.log("invite")
  }

  return (
    <>
      <div className="group-page">
        <CommunitySideBar />
        {group !== undefined && userData !== undefined ?
          <div className="group-content">
            <div className="group-page-title">
              <h3
              >Communities</h3>
              <KeyboardArrowRightIcon
                sx={{ fontSize: '30px', marginTop: '1px' }}
              />
              <h3>Groups</h3>
            </div>
            <div className="group-header">
              <div className="group-button-column">
                <div className="group-img-container">
                  <img
                    className={(!group.isPublic && !group.members.includes(userData.id)) ? "group-img-locked" : "group-img"}
                    src={group.picture || cmLogo}
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
                <div className="group-members">{group.members.length} Members &mdash; Created {getRelativeDateString(group.dateCreated)}</div>
                <br />
                <div>{group.description}</div>
              </div>
            </div>
            <br />
            <div>Discussion Boards</div>
            <Divider />
            
            {/* TODO */}
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

export default GroupPage;