import { useAuth0 } from "@auth0/auth0-react";
import { SmallLoading } from "../../../components/Loading";
import CommunitySideBar from "../sidebar/CommunitySideBar";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
import { loadUser } from "../../reviews/review-utils";
import "./CreateGroupPage.css"
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import ProfilePicture from "../../settings/profile/ProfilePicture";
import Button from "../../../components/button/Button";
import dayjs from "dayjs";
import { createGroup } from "../community-utils";
import SuccessAlert from "../../../components/SuccessAlert";

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

function CreateGroupPage() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [groupPicture, setGroupPicture] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  const clearFields = () => {
    setName("");
    setDescription("");
    setGroupPicture(null);
    setIsPrivate(false);
  }

  const handleCreateClick = () => {
    const newGroup = {
      groupName: name,
      description: description,
      owner: userData.id,
      picture: groupPicture,
      isPublic: !isPrivate,
      members: [userData.id],
      joinRequests: [],
      discussionBoards: [],
      dateCreated: dayjs()
    }
    createGroup(newGroup, setSuccess);
    clearFields();
  }

  return (
    <>
      <div className="create-group-page">
        <CommunitySideBar />
        <div className="create-group-content">
          <div className="create-group-page-title">
            <h3
            >Communities</h3>
            <KeyboardArrowRightIcon
              sx={{ fontSize: '30px', marginTop: '1px' }}
            />
            <h3>Create A Group</h3>
          </div>
          {userData !== undefined ?
            <>
              <div className="create-group-img-header">
                <div className="create-group-img-container">
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
              <div className="create-group-button">
                <Button
                  label={"Create Group"}
                  onClick={handleCreateClick}
                  width={'180px'}
                  disabled={name === "" || description === ""}
                />
              </div>
              <SuccessAlert
                message={"Group successfully created"}
                showAlert={success}
                setShowAlert={setSuccess}
              />
            </>
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

export default CreateGroupPage;