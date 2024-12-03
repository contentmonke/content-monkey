import { useAuth0 } from "@auth0/auth0-react";
import { SmallLoading } from "../../../components/Loading";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
import { loadUser } from "../../reviews/review-utils";
import "./ManageGroupsPage.css"
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import ProfilePicture from "../../settings/profile/ProfilePicture";
import Button from "../../../components/button/Button";
import SuccessAlert from "../../../components/SuccessAlert";
import { useParams } from "react-router-dom";
import { fetchGroup, getListOfUsers } from "../community-utils";
import { Group } from "../../../models/Models";
import JoinRequests from "./JoinRequests";

const textfieldSx = {
  width: '100%',
  mb: 3,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#31628F",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#31628F", // Change label color on focus
    },
  },
}

function ManageGroupsPage() {
  const { user } = useAuth0();
  const { groupId } = useParams();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [groupPicture, setGroupPicture] = useState<string | null>(null);
  const [joinRequests, setJoinRequests] = useState(undefined);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    setNeedsUpdate(false);
    loadUser(user.name, setUserData);
    fetchGroup(parseInt(groupId!, 10), setGroup);
  }, [user?.name, needsUpdate]);

  useEffect(() => {
    if (group !== undefined) {
      setName(group.groupName);
      setDescription(group.description);
      setGroupPicture(group.picture);
      setIsPrivate(!group.isPublic);
      getListOfUsers(group.joinRequests, setJoinRequests)
    }
  }, [group]);

  const clearFields = () => {
    setName("");
    setDescription("");
    setGroupPicture(null);
    setIsPrivate(false);
  }

  // const handleCreateClick = () => {
  //   const newGroup = {
  //     groupName: name,
  //     description: description,
  //     owner: userData.id,
  //     picture: groupPicture,
  //     isPublic: !isPrivate,
  //     members: [userData.id],
  //     joinRequests: [],
  //     discussionBoards: [],
  //     dateCreated: dayjs()
  //   }
  //   createGroup(newGroup, setSuccess);
  //   clearFields();
  // }

  return (
    <>
      <div className="manage-group-page">
        <CommunitySideBar />
        <div className="manage-group-content">
          <div className="manage-group-page-title">
            <h3
            >Communities</h3>
            <KeyboardArrowRightIcon
              sx={{ fontSize: '30px', marginTop: '1px' }}
            />
            <h3>Manage Group</h3>
          </div>
          {userData !== undefined && group !== undefined && userData.id === group.owner ?
            <>
              <div className="manage-group-img-header">
                <div className="manage-group-img-container">
                  <ProfilePicture
                    profilePicture={groupPicture}
                    setProfilePicture={setGroupPicture}
                  />
                </div>
              </div>
              <div>Group Name</div>
              <TextField
                sx={{ ...textfieldSx }}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <div>Group Description</div>
              <TextField
                sx={{ ...textfieldSx }}
                multiline
                rows={8}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <FormControlLabel
                label={"Private"}
                control={
                  <Checkbox
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                    sx={{
                      color: "#31628F", // Default color
                      "&.Mui-checked": {
                        color: "#31628F", // Color when checked
                      },
                    }}
                  />
                }
              />
              <JoinRequests
                groupId={group.id}
                userId={userData.id}
                joinRequests={joinRequests}
                setNeedsUpdate={setNeedsUpdate}
              />
              <div className="manage-group-button">
                <Button
                  label={"Modify Group"}
                  onClick={() => { }}
                  width={'180px'}
                  disabled={name === "" || description === ""}
                />
              </div>
              <SuccessAlert
                message={"Group successfully modified"}
                showAlert={success}
                setShowAlert={setSuccess}
              />
            </>
            :
            <div className="loading-container">
              {userData.id}
              {group.owner}
              <SmallLoading />
            </div>
          }
        </div>
      </div >
    </>
  );
}

export default ManageGroupsPage;