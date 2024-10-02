import '../../App.css';
import { useEffect, useState } from 'react';
import cmLogo from '/monkey.svg';
import LoginButton from '../home/SignUpButton/SignUpButton';
import LogoutButton from '../home/LogoutButton/LogoutButton';
import Profile from '../profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import DeleteAccount from '../../components/DeleteAccount';
import { AppBar, Toolbar, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import ExampleList from '../../example/ExampleList';
import CreateReviewButton from '../reviews/CreateReviewButton';

// Dummy Data for favorite media, liked posts, and recent reviews
const favoriteMedia = ['Book: The Great Gatsby', 'Movie: Inception', 'Show: Breaking Bad'];
const likedPosts = ['Post 1: Awesome day!', 'Post 2: React is amazing!', 'Post 3: Beautiful sunset.'];
const recentReviews = ['Review 1: This book was a masterpiece!', 'Review 2: The movie had a fantastic plot!', 'Review 3: A must-watch series!'];

function AccountPage() {
  const [count, setCount] = useState(0);
  const { user, isLoading, error } = useAuth0();
  const [userData, setUserData] = useState();

  const handleDeleteAccount = async () => {
    try {
      // Replace with your API call to delete the account
      console.log('Account deletion process initiated.');
      // You could use an axios call or any other method here:
      // await axios.delete('http://localhost:8080/api/user/delete');
      alert('Account successfully deleted.');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoading && user?.name) {
          const response = await axios.post('http://localhost:8080/api/user/', { name: user?.name });
          setUserData(response.data);
          console.log(response.data);
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
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: 'lightblue' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Profile Page</Typography>
        </Toolbar>
      </AppBar>

      {/* Adding padding to prevent content from being hidden behind navbar */}
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
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {userData?.bio || 'No biography available.'}
                      </Typography>
                      {/* Delete Account Button under profile info */}
                      <DeleteAccount onDelete={handleDeleteAccount} />
                    </>
                  )}
                </Box>
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
    </>
  );
}

export default AccountPage;