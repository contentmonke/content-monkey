import { Cancel, CheckCircle } from "@mui/icons-material";
import { SmallLoading } from "../../../components/Loading";
import "./ManageGroupsPage.css";
import { useNavigate } from "react-router-dom";
import { handleRequest } from "../community-utils";

function JoinRequests({ groupId, userId, joinRequests, setNeedsUpdate }: any) {

  const navigate = useNavigate();

  const handleClickUser = (id) => {
    navigate(`/u/${id}`);
  }

  const handleJoinRequest = (joinRequest) => {
    handleRequest(joinRequest, setNeedsUpdate);
  }

  const handleAcceptRequest = (requesterId: number) => {
    const joinRequest = {
      groupId: groupId,
      approverId: userId,
      requesterId: requesterId,
      isApproved: true
    }
    handleJoinRequest(joinRequest);
  }

  const handleDeclineRequest = (requesterId: number) => {
    const joinRequest = {
      groupId: groupId,
      approverId: userId,
      requesterId: requesterId,
      isApproved: false
    }
    handleJoinRequest(joinRequest);
  }

  return (
    <>
      <div className="join-request-header">Join Requests</div>
      {joinRequests !== undefined ?
        <>
          {joinRequests.length > 0 ?
            <div className="request-list">
              {joinRequests.map((user: any, index: number) => (
                <div key={index} className="request-item"
                >
                  <div className="request-title"
                    onClick={() => handleClickUser(user.id)}
                  >{user.name}
                  </div>
                  <div className="request-icons">
                    <CheckCircle
                      onClick={() => handleAcceptRequest(user.id)}
                      style={{ color: '#4caf50', cursor: 'pointer' }}
                    />
                    <Cancel
                      onClick={() => handleDeclineRequest(user.id)}
                      style={{ color: '#FF3E3E', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            :
            <div className="no-requests">
              No pending requests
            </div>
          }
        </>
        :
        <div className="loading-container">
          <SmallLoading />
        </div>
      }
    </>
  );
}

export default JoinRequests;