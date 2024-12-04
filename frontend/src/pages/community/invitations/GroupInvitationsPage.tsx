import { useNavigate } from "react-router-dom";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import { SmallLoading } from "../../../components/Loading";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../../reviews/review-utils";
import "./GroupInvitationsPage.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchBox from "../../../components/SeachBox";
import Button from "../../../components/button/Button";
import { fetchInvitations, handleInvite } from "../community-utils";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { getDateString, getRelativeDateString } from "../../media/media-utils";


function GroupInvitations() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [groupInvites, setGroupInvites] = useState(undefined);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [inviteSearch, setInviteSearch] = useState("");

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  useEffect(() => {
    if (userData?.id === undefined) {
      return;
    }
    fetchInvitations(userData.id, setGroupInvites);
  }, [userData?.id]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    // reroute
  }

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  }

  const handleClickGroup = (groupId) => {
    navigate(`/community/group/${groupId}`);
  }

  const handleAcceptInvite = (groupInvite) => {
    handleInvite(userData.id, groupInvite.groupId, true, setGroupInvites);
  }

  const handleDeclineInvite = (groupInvite) => {
    handleInvite(userData.id, groupInvite.groupId, false, setGroupInvites);
  }

  return (
    <>
      <div className="group-invitations-page">
        <CommunitySideBar />
        <div className="group-invitations-content">
          <div className="group-invitations-page-title">
            <h3>Communities</h3>
            <KeyboardArrowRightIcon
              sx={{ fontSize: '30px', marginTop: '1px' }}
            />
            <h3>Groups</h3>
            <KeyboardArrowRightIcon
              sx={{ fontSize: '30px', marginTop: '1px' }}
            />
            <h3>Invitations</h3>
          </div>

          <div className="invite-search">
            <div className="invite-search-bar">
              <SearchBox
                searchQuery={inviteSearch}
                onSearchInputChange={handleInputChange}
                onSearchSubmit={handleSearchSubmit}
                onSearchSubmitOnEnter={handleSearchEnter}
                placeholder="Search invitations"
              />
            </div>
            <div className="invite-search-button">
              <Button
                onClick={handleSearchSubmit}
                label={"Search"}
                width={'120px'}
              />
            </div>
          </div>
          {groupInvites !== undefined ?
            <div className="invite-page-contentlist">
              {groupInvites.length > 0 ?
                <ul className="invite-page-ul">
                  {groupInvites.map((invite: any, index: number) => (
                    <li key={index} className="activity-item">
                      <div className="invite-item-header">
                        <div className="invite-item-info">
                          <span className="invite-item-perp">
                            {(invite.inviters.length > 1) ?
                              `${invite.inviters.length} people`
                              :
                              invite.inviters[0]
                            }
                          </span>
                          invited you to
                          <span
                            className="invite-item-vict"
                            onClick={() => handleClickGroup(invite.groupId)}
                          >{invite.groupName}</span>
                        </div>
                        <div className="request-icons">
                          <CheckCircle
                            onClick={() => handleAcceptInvite(invite)}
                            style={{ color: '#4caf50', cursor: 'pointer' }}
                          />
                          <Cancel
                            onClick={() => handleDeclineInvite(invite)}
                            style={{ color: '#FF3E3E', cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                      <div className="invite-item-dates">
                        <span className="invite-relative-date">
                          {getRelativeDateString(new Date(invite.dateSent))}
                        </span>
                        <span className="invite-absolute-date">
                          {getDateString(new Date(invite.dateSent))}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                :
                <div>No pending invitations</div>
              }
            </div>
            :
            <div className="loading-container">
              <SmallLoading />
            </div>
          }
        </div>
      </div >
    </>
  );
}

export default GroupInvitations;