import '../../App.css';
import './AccountPage.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Typography, Rating, Divider, Container, IconButton } from '@mui/material';
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import ActivityChart from '../../components/activity-chart/ActivityChart';

import Button from "../../components/button/Button";
import { useNavigate, useParams } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { id } = useParams(); // Get the username from the URL

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [name, setName] = useState('User not found');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('No biography available.');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [loggedInUserFriendRequests, setLoggedInUserFriendRequests] = useState([]);
  const [loggedInBlock, setLoggedInBlock] = useState([]);
  const [loggedInUserFriends, setLoggedInUserFriends] = useState([]);
  const [isDisabledRequest, setIsDisabledRequest] = useState(false);
  const [isDisabledBlock, setIsDisabledBlock] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileContent, setProfileContent] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);


  // Mock data for favorite content and reviews
//   const favoriteContent = [
//     { id: 1, title: 'Inception', imageUrl: 'https://via.placeholder.com/150' },
//     { id: 2, title: 'Breaking Bad', imageUrl: 'https://via.placeholder.com/150' },
//     { id: 3, title: 'The Witcher 3', imageUrl: 'https://via.placeholder.com/150' },
//   ];

  useEffect(() => {
      try {
        const getUser = async () => {
          if (isLoading === false && user !== null) {
            const curr_user = await axios.post("http://localhost:8080/api/user/", user)
            //console.log("Setting logged in user" + curr_user.data[0].id);
            setLoggedInUserId(curr_user.data[0].id);
            setLoggedInUserFriendRequests(curr_user.data[0].friend_requests);
            setLoggedInBlock(curr_user.data[0].blocked_users);
            setLoggedInUserFriends(curr_user.data[0].friend_list);
            setLoggedInUserFriendRequests(curr_user.data[0].friend_requests)
          }
        }
        getUser()
      } catch (err) {
        console.log("Error getting logged in user", err)
      }
    }, [isLoading, user])

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get(`http://localhost:8080/api/user/${id}`);
        const favoriteContent = await axios.get(`http://localhost:8080/api/user/getFavorites?id=${id}`);
        setProfileContent(favoriteContent.data);
        const mappedFavorites = favoriteContent.data
            ? await Promise.all(
                favoriteContent.data.map(async (element) => {
                    // Make the API call to fetch imageUrl for each element
                    const response = await axios.get(`http://localhost:8080/api/search/any/${element}`);

                    // Return an object with title and imageUrl based on API responses with null check
                    return {
                        title: element,
                        imageUrl: response.data?.[0]?.thumbnail || null // Using optional chaining for safety
                    };
                })
              )
            : [];
        setProfileContent(mappedFavorites);
        //await axios.post('http://localhost:8080/api/user/', { name: user?.name });
        //const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
        //await axios.put('http://localhost:8080/api/user/email/' + idResponse.data[0].id, { email: user?.email });
        //const userBio = await axios.post('http://localhost:8080/api/user/name/' + user.name);
        const recentReviews = await axios.get(`http://localhost:8080/api/reviews/userId/${id}`);
        const reviewsWithMediaTitles = await Promise.all(
          recentReviews.data.map(async (review: any) => {
            const mediaResponse = await axios.get(`http://localhost:8080/api/media/id/${review.mediaId}`);
            return {
              ...review,
              mediaTitle: mediaResponse.data.mediaTitle,  // Add the media title to the review object
            };
          })
        );

        const sortedReviews = reviewsWithMediaTitles.sort(
          (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );


        setEmail(userResponse.data.email);
        setName(userResponse.data.username);
        if (userResponse.data.picture != null) {
          setProfilePicture(userResponse.data.picture);
        }
        if (userResponse.data.bio != null) {
          setBio(JSON.parse(userResponse.data.bio).biography)
        }
        if (userResponse.data.genres != null) {
          setFavoriteGenres(JSON.parse(userResponse.data.genres).genres)
        }
        setReviews(sortedReviews.slice(0, 3));
        //console.log("Checking privacy status");
        //console.log(userResponse.data.friend_list?.includes(loggedInUserId));
        //console.log(loggedInUserId);
        //console.log(userResponse.data.friend_list);
        if (userResponse.data.priv === 1 && !userResponse.data.friend_list?.includes(String(loggedInUserId)) && id != loggedInUserId) {
            setIsPrivate(true);
            return;
        }

        setIsPrivate(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, [id, loggedInUserId]);


  const handleFriendRequest = async () => {
    try {
      const sendRequest = await axios.post(`http://localhost:8080/api/user/friend_requests/${loggedInUserId}/${id}`)
      console.log(sendRequest)
      setIsDisabledRequest(true);
    } catch (err) {
      console.log("Error while sending friend request", err)
    }
  }


  const handleBlockRequest = async () => {
    try {
      console.log('ID to block:', id);
      console.log('Logged-in User ID:', loggedInUserId);

      const response = await axios.post(`http://localhost:8080/api/user/blockUser?blockId=${id}&userId=${loggedInUserId}`);
      setSuccessMessage('User blocked successfully');
      setIsDisabledBlock(true);
      console.log('User blocked successfully:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error blocking user:', error.response.data);
        setSuccessMessage('User Already Blocked!');
      } else {
        console.error('Error blocking user:', error.message);
        setSuccessMessage('User Already Blocked!');
      }
    }
  };

  if (!isPrivate) {
      return <>
          <div className="profile-container">
            {/* Left Sidebar */}
            <div className="sidebar">
              <img src={profilePicture} alt={name} className="pub-profile-picture" />
              <p className="prof-name">{name}</p>
              <p>{bio}</p>
              <div>
                {favoriteGenres.map((genre, index) => (
                  <div key={index} className="genre-item">
                    <div className="fave-genre">{genre}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(isAuthenticated && user && user.email === email) ? (
                  <Button onClick={() => navigate('/settings/profile')} label="Edit Profile" width="230px" />
                ) : (
                  <>
                    <Button
                      onClick={() => handleFriendRequest()}
                      label={loggedInUserFriendRequests?.includes(id) || isDisabledRequest ? "Requested" : "Request"}
                      width="230px"
                      disabled={loggedInUserFriendRequests?.includes(id) || isDisabledRequest}
                    />
                    {/* Block */}
                    <Button
                      onClick={() => handleBlockRequest()}
                      label="Block"
                      width="230px"
                      disabled={loggedInBlock?.includes(id) || isDisabledBlock}
                    />
                    {successMessage && (
                              <div className="success-message">
                                <p>{successMessage}</p>
                              </div>
                    )}
                  </>
                )}
              </div>
              <hr />
              <ul className="sidebar-menu">
                <li onClick={() => navigate(`/u/${id}/activity`)}>Activity</li>
                <li onClick={() => navigate(`/u/${id}/friends`)}>Friends</li>
                <li onClick={() => navigate(`/u/${id}/content`)}>Content</li>
                {(isAuthenticated && user && user.email == email) ?
                  <li onClick={() => navigate('/upload')}>Upload Goodreads Data</li> : (<></>)
                }
              </ul>
            </div>

            {/* Right Main Content */}
            <div className="main-content">
              <div className="favorite-content">
                <p className="fave-titles" onClick={() => navigate(`/u/${id}/content/favorites`)} >Favorite Content</p>
                <hr className="main-divider" />
                <div className="content-grid">
                    {profileContent.map(item => (
                        <div key={item.id} className="content-item">
                            <img src={item.imageUrl} alt={item.title} className="content-image" />
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
              </div>

              <div className="recent-reviews">
                <p className="fave-titles" onClick={() => navigate(`/u/${id}/activity`)}>Recent Reviews</p>
                <hr className="main-divider" />
                <ul>
                  {reviews
                    .filter((review) => review.rating > 0) // Filter out reviews with a rating of 0
                    .map((review, index) => (
                      <div key={index}>
                        <li>
                          <div className="review-header">
                            {(() => {
                              const reviewDate = new Date(review.dateCreated);
                              console.log(reviews);
                              reviewDate.setHours(reviewDate.getHours() - 4); // Subtract 4 hours for EST
                              return (
                                <>
                                  <Rating
                                    size={'small'}
                                    sx={{ my: 0, mr: 1, mb: 0.5 }}
                                    value={review.rating}
                                    precision={0.5}
                                    readOnly
                                  />
                                  <p className="review-date">
                                    {reviewDate.toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: '2-digit',
                                    })}{' '}
                                    {reviewDate.toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    })}
                                  </p>
                                </>
                              );
                            })()}
                          </div>

                          {/* Other content like review title and upvotes/downvotes */}
                          <p className="review-title">{review.mediaTitle}</p>

                          <Container disableGutters>
                            <IconButton size={'small'}>
                              <ThumbUp sx={{ width: 15 }} />
                            </IconButton>
                            <Typography variant="caption">{review.upVotes}</Typography>
                            <IconButton>
                              <ThumbDown sx={{ width: 15 }} />
                            </IconButton>
                            <Typography variant="caption">{review.downVotes}</Typography>
                          </Container>
                        </li>

                        {/* Add a Divider between each review */}
                        {index < reviews.length - 1 && <Divider sx={{ marginY: 2 }} />}
                      </div>
                    ))}

                </ul>
              </div>

              <hr className="main-divider" />

              <div>
                <ActivityChart userId={id} />
              </div>
            </div>
          </div >
        </>
  }

  return (
    <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '15vh' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        textAlign: 'center',
        maxWidth: '300px',
      }}>
        <h1 style={{ margin: 0 }}>User is Private!</h1>
      </div>
    </div>
  );


};

export default AccountPage;