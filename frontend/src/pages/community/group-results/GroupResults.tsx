import { Group } from "../../../models/Models";
import "./GroupResults.css"
import cmLogo from '../../../assets/monkey.png';
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

type params = {
  groups: Group[],
  userId: number
}

function GroupResults({ groups, userId }: params) {
  const navigate = useNavigate();
  return (
    <>
      {groups?.length > 0 ?
        <div className="group-results">
          {groups.map((group) => (
            <div className="group-result-item" key={group.id}>
              <div className="group-result-img-container">
                <img
                  className={group.isPublic ?
                    "group-result-img-public" :
                    "group-result-img-private"
                  }
                  src={group.picture || 'https://via.placeholder.com/150'}
                />
                <div className="group-result-lock">
                  {!group.isPublic && group.members.includes(userId) &&
                    <LockOpenIcon />
                  }
                  {!group.isPublic && !group.members.includes(userId) &&
                    <LockIcon />
                  }
                </div>
              </div>
              <div className="group-result-content">
                <div
                  className="group-result-title"
                  onClick={() => navigate(`/community/group/${group.id}`)}>
                  {group.groupName}
                </div>
                <div className="group-result-members">
                  {group.members.length} members
                </div>
                <div className="group-result-description">
                  {group.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        :
        <></>
      }
    </>
  );

}

export default GroupResults;