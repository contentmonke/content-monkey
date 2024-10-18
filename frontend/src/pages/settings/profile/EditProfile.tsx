import React, { useState, useEffect } from 'react';
import SettingsSidebar from '../sidebar/SettingsSidebar'; // Import the sidebar
import '../Settings.css'; // Import your custom CSS
import { TextField } from '@mui/material';
import Button from '../../../components/button/Button';
import ProfilePicture from './ProfilePicture';
import EditIcon from '@mui/icons-material/Edit';
import EditGenresModal from './editGenresModal';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, error, isLoading } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);
  const [bio, setBio] = useState('No biography available.');
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoading && user?.name) {
          await axios.post('http://localhost:8080/api/user/', { name: user?.name });
          const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
          await axios.put('http://localhost:8080/api/user/email/' + idResponse.data[0].id, { email: user?.email });
          const userBio = await axios.post('http://localhost:8080/api/user/name/' + user.name);
          const recentReviews = await axios.get('http://localhost:8080/api/reviews/userId/' + idResponse.data[0].id);

          const reviewsWithMediaTitles = await Promise.all(
            recentReviews.data.map(async (review: any) => {
              const mediaResponse = await axios.get(`http://localhost:8080/api/media/id/${review.mediaId}`);
              return {
                ...review,
                mediaTitle: mediaResponse.data.mediaTitle,  // Add the media title to the review object
              };
            })
          );

          const biography = userBio.data[0].bio;
          const genres = userBio.data[0].genres;

          setBio(JSON.parse(biography).biography || 'No biography available.');
          setFavoriteGenres(JSON.parse(genres).genres || 'No Genres available.');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, [user?.name]);

  const handleOpenGenresModal = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseGenresModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => setBio(event.target.value);

  return (
    <div className="main-content-settings">
      <SettingsSidebar /> {/* Sidebar on the left */}
      <div className="settings-content-layout">
        <h1>Profile</h1>

        <div className="pic-and-bio-field">
          <div className="profile-picture-section">
            <label className="settings-prof-pic-label" htmlFor="profile-picture">Profile Picture</label>
            <div>
              <ProfilePicture
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
              />
            </div>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#31628F', // Border color when focused
                  },
                },
              }}
              onChange={handleBioChange}
            />
          </div>
        </div>

        <div className="profile-field">
          <div className="genre-title-settings">
            <label className="genre-setttings" htmlFor="genres">Favorite Genres</label>
            <button onClick={() => handleOpenGenresModal()}><EditIcon /> </button>
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
          <Button label='Update Profile' onClick={() => console.log()} />
        </div>
      </div>
      <EditGenresModal
        open={modalOpen}
        handleClose={handleCloseGenresModal}
        favoriteGenres={favoriteGenres}
        setFavoriteGenres={setFavoriteGenres}
      />
    </div >
  );
};

export default EditProfile;