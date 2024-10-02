import '../../App.css';
import { useEffect, useState } from 'react';
import cmLogo from '/monkey.svg';
import LoginButton from '../home/LoginButton/LoginButton';
import LogoutButton from '../home/LogoutButton/LogoutButton';
import Profile from '../profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import DeleteAccount from '../../components/DeleteAccount';
import { AppBar, Toolbar, Typography, Box, Grid, Card, CardContent, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExampleList from '../../example/ExampleList';
import EditGenresModal from './EditGenresModal'; // Import the modal

// Dummy Data for favorite media, liked posts, recent reviews, and genres
const favoriteMedia = ['Book: The Great Gatsby', 'Movie: Inception', 'Show: Breaking Bad'];
const likedPosts = ['Post 1: Awesome day!', 'Post 2: React is amazing!', 'Post 3: Beautiful sunset.'];
const recentReviews = ['Review 1: This book was a masterpiece!', 'Review 2: The movie had a fantastic plot!', 'Review 3: A must-watch series!'];
const dummyGenres = []; // Initial dummy data for genres

function AccountPage() {
  const [count, setCount] = useState(0);
  const { user, isLoading, error, logout } = useAuth0();
  const [userData, setUserData] = useState();
  const [bio, setBio] = useState('No biography available.');
  const [favoriteGenres, setFavoriteGenres] = useState(dummyGenres); // New state for genres
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleDeleteAccount = async () => {
    try {
      console.log('Account deletion process initiated.');
      const userEdit = await axios.post('http://localhost:8080/api/user/name/' + user.name);
      const userDel = await axios.delete('http://localhost:8080/api/user/' + userEdit.data[0].id);
      console.log('localhost:8080/api/user/' + userEdit.data[0].id)
      alert('Account successfully deleted.');
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  const getBio = async () => {
    const userEdit = await axios.post('http://localhost:8080/api/user/name/' + user.name);
    return userEdit.data[3];
  }

  const handleEditBio = async () => {
    const newBio = prompt('Please enter your new biography:', bio);
    if (newBio !== null && newBio !== '') {
      try {
        const userEdit = await axios.post('http://localhost:8080/api/user/name/' + user.name);
        const response = await axios.put('http://localhost:8080/api/user/' + userEdit.data[0].id + '/biography', { biography: newBio });

        if (response.status === 200) {
          setBio(newBio);
          alert('Biography updated successfully!');
        }
      } catch (error) {
        console.error('Error updating biography:', error);
        alert('Failed to update biography.');
      }
    }
  };

  const handleOpenGenresModal = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseGenresModal = () => {
    setModalOpen(false); // Close the modal
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoading && user?.name) {
          const response = await axios.post('http://localhost:8080/api/user/', { name: user?.name });
          setUserData(response.data);
          const userBio = await axios.post('http://localhost:8080/api/user/name/' + user.name);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ paddingTop: '64px', paddingLeft: 4, paddingRight: 4 }}>
        <Grid container spacing={4}>
          {/* Left Section: User Info */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {user && (
                    <>
                      <Avatar src={user.picture} alt={user.name} sx={{ width: 150, height: 150, marginBottom: 2 }} />
                      <Typography variant="h5">{user.name}</Typography>

                      {/* Biography Section with Edit Icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, width: '100%' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                          Biography
                        </Typography>
                        <IconButton onClick={handleEditBio} size="small" aria-label="edit biography">
                          <EditIcon />
                        </IconButton>
                      </Box>

                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {bio}
                      </Typography>
                      {/* Delete Account Button under profile info */}
                      <DeleteAccount onDelete={handleDeleteAccount} />
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* New Card for Favorite Genres */}
            <Card sx={{ marginTop: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, width: '100%' }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Favorite Genres
                  </Typography>
                  <IconButton onClick={handleOpenGenresModal} size="small" aria-label="edit genres">
                    <EditIcon />
                  </IconButton>
                </Box>
                <ul>
                  {favoriteGenres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Section: Favorite Media, Liked Posts, Recent Reviews */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Favorite Media */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Favorite Media
                    </Typography>
                    <ul>
                      {favoriteMedia.map((media, index) => (
                        <li key={index}>{media}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>

              {/* Liked Posts */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Liked Posts
                    </Typography>
                    <ul>
                      {likedPosts.map((post, index) => (
                        <li key={index}>{post}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Reviews */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Reviews
                    </Typography>
                    <ul>
                      {recentReviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Edit Genres Modal */}
      <EditGenresModal
        open={modalOpen}
        handleClose={handleCloseGenresModal}
        favoriteGenres={favoriteGenres}
        setFavoriteGenres={setFavoriteGenres}
      />
    </>
  );
}

export default AccountPage;
