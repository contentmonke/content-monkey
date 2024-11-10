import React, { useState, useEffect } from 'react';
import SettingsSidebar from '../sidebar/SettingsSidebar';
import '../Settings.css';
import { TextField, FormHelperText } from '@mui/material';
import Button from '../../../components/button/Button';
import ProfilePicture from './ProfilePicture';
import EditIcon from '@mui/icons-material/Edit';
import EditGenresModal from './EditGenresModal';
import SuccessAlert from '../../../components/SuccessAlert';
import ErrorAlert from '../../../components/ErrorAlert';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const EditProfile: React.FC = () => {
  const { user, isLoading } = useAuth0();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [bio, setBio] = useState('No biography available.');
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoading && user?.name) {
          const idResponse = await axios.post(`http://localhost:8080/api/user/name/${user.name}`);
          const userId = idResponse.data[0].id;

          const userBio = await axios.post(`http://localhost:8080/api/user/name/${user.name}`);
          const profilePic = await axios.get('http://localhost:8080/api/user/getPicture', { params: { id: userId } });

          setProfilePicture(profilePic.data);
          setBio(JSON.parse(userBio.data[0].bio).biography || 'No biography available.');
          setFavoriteGenres(JSON.parse(userBio.data[0].genres).genres || 'No Genres available.');
          setUsername(userBio.data[0].username);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, [user?.name]);

  // Handle username validation
  const validateUsername = async (value: string) => {
    setUsername(value);
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError("Username can only contain alphanumeric characters and underscores.");
    } else if (value.length > 32) {
      setUsernameError("Username cannot exceed 32 characters.");
    } else {
      setUsernameError('')
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => setBio(event.target.value);

  const handleUpdate = async () => {
    if (usernameError) return;

    try {
      // Check for uniqueness
      const response = await axios.get(`http://localhost:8080/api/user/check-username`, { params: { username } });
      if (!response.data.available) {
        setUsernameError("Username is already taken.");
        return;
      } else {
        setUsernameError('');
      }
    } catch (error) {
      setUsernameError("Error checking username availability.");
      return;
    }

    try {
      const userEdit = await axios.post(`http://localhost:8080/api/user/name/${user.name}`);
      const userId = userEdit.data[0].id;

      // Update bio
      await axios.put(`http://localhost:8080/api/user/${userId}/biography`, { biography: bio });

      // Update genres
      await axios.put(`http://localhost:8080/api/user/genres/${userId}`, { genres: favoriteGenres });

      // Update profile picture
      await axios.post('http://localhost:8080/api/user/updatePicture', { id: userId, picture: profilePicture });

      // Update username
      await axios.put(`http://localhost:8080/api/user/${userId}/username`, { username });

      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="main-content-settings">
      <SettingsSidebar />
      <div className="settings-content-layout">
        <h1>Profile</h1>

        <div className="username-field">
          <label className="settings-prof-pic-label" htmlFor="username">Username</label>
          <TextField
            value={username}
            onChange={(e) => validateUsername(e.target.value)}
            error={!!usernameError}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#31628F',
                },
              },
            }}
            fullWidth
          />
          <FormHelperText error>{usernameError}</FormHelperText>
        </div>

        <div className="pic-and-bio-field">
          <div className="profile-picture-section">
            <label className="settings-prof-pic-label" htmlFor="profile-picture">Profile Picture</label>
            <ProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
          </div>

          <div className="bio-field">
            <label className="settings-prof-pic-label" htmlFor="bio">Bio</label>
            <TextField
              id="bio"
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              placeholder="Tell us something about yourself..."
              value={bio}
              onChange={handleBioChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#31628F',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="profile-field">
          <div className="genre-title-settings">
            <label className="genre-setttings" htmlFor="genres">Favorite Genres</label>
            <button onClick={() => setModalOpen(true)}><EditIcon /></button>
          </div>

          <div>
            {favoriteGenres.map((genre, index) => (
              <div key={index} className="genre-item">
                <div className="fave-genre">{genre}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="save-button">
          <Button label='Update Profile' onClick={handleUpdate} />
        </div>
      </div>
      <EditGenresModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        favoriteGenres={favoriteGenres}
        setFavoriteGenres={setFavoriteGenres}
      />
      <SuccessAlert
        message="Profile updated successfully."
        showAlert={isSuccess}
        setShowAlert={setIsSuccess}
      />
      <ErrorAlert
        message="Failed to update profile. Try again later."
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </div>
  );
};

export default EditProfile;