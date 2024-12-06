import { useEffect, useState } from "react";
import { fetchMedia, fetchStreamingServices } from "./media-utils";
import { Media, MediaLabel } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { Container, Divider, Rating, Typography } from "@mui/material";
import { leftColumn, mediaDetails, mediaImage, mediaPageContainer, mediaRatings, mediaReviews, rateField, rightColumn, streamingLogo } from "../../style/media-page";
import StatusDropdown from "./StatusDropdown";
import ActionDropdown from "./ActionDropdown";
import RatingStars from "../../components/RatingStars";
import ReviewSubsection from "./ReviewSubsection";
import ErrorAlert from "../../components/ErrorAlert";
import { UhOh } from "../../components/UhOh";
import { useLocation } from 'react-router-dom';
import CreateReviewButton from "../reviews/CreateReviewButton";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/button/Button";
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import primeVideoLogo from '/primeVideoLogo.png';
import disneyPlusLogo from '/disneyPlusLogo.png';
import netflixLogo from '/netflixLogo.png'
import googlePlayLogo from '/googlePlayLogo.png'
import CountryDropdown from "./countryListComponent";
import { createReview } from "../../api/objects";
import ConfirmCancelModal from "./ConfirmCancelModal";
import CloseIcon from "@mui/icons-material/Close";
import SuccessAlert from '../../components/SuccessAlert';


function MediaPage() {
  const [media, setMedia] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doneSearching, setDoneSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [labels, setLabels] = useState<MediaLabel | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const location = useLocation(); // Accessing the state passed from the navbar
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [favorited, setFavorited] = useState(false);
  const [streamingService, setStreamingService] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log( "location: ", location );
    if (location && location.state && location.state.result && needsUpdate) {
      setNeedsUpdate(false);
      fetchMedia(location.state.result, setMedia, setStreamingService, setLabels, setIsLoading, setIsError, setDoneSearching);
      // fetchMedia(null, setMedia, setLabels, setIsLoading, setIsError, setDoneSearching);
    }
    const fetchFavorites = async () => {
      try {
        if (!isLoading && user?.name && media) {
          const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
          const favoritesResponse = await axios.get<string[]>(`http://localhost:8080/api/user/getFavorites?id=` + idResponse.data[0].id);
          if (favoritesResponse.data.includes(media.mediaTitle)) {
            setFavorited(true);
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    fetchFavorites();
  }, [needsUpdate, media, user]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (user?.name && media) {
        try {
          const idResponse = await axios.post(`http://localhost:8080/api/user/name/${user?.name}`);
          const userId = idResponse.data[0].id;
          const reviews = await axios.get(`http://localhost:8080/api/reviews/userId/${userId}`);
          const review = reviews.data.find((review: any) => review.mediaId === media.id);

          if (review) {
            setCurrentStatus(review.progress || "Not Started"); // Default to "Not Started" if no progress
            setUserRating(review.rating);
          } else {
            setCurrentStatus("Not Started");
            setUserRating(0);
          }
        } catch (error) {
          console.error('Error fetching status:', error);
        }
      }
    };

    fetchStatus();
  }, [user, media]);

  useEffect(() => {
    fetchStreamingServices(media, selectedCountryCode, setStreamingService, setIsLoading, setIsError);
  }, [selectedCountryCode]);

const handleQuickRate = async (value: number) => {
  if (!isAuthenticated) {
    loginWithRedirect();
    return;
  }

  setUserRating(value);

  try {
    const idResponse = await axios.post(`http://localhost:8080/api/user/name/${user?.name}`);
    const userId = idResponse.data[0].id;
    const reviews = await axios.get(`http://localhost:8080/api/reviews/userId/${userId}`);
    const matchingReview = reviews.data.find((review: any) => review.mediaId === media.id);
    const currentBody = matchingReview ? matchingReview.body : "";
    createReview({ mediaType: media.mediaType,
       mediaId: media.id,
       userId: userId,
       progress: status,
       rating: value,
       body: currentBody, })
       .then((response) => {
       })
       .catch((error) => {
          console.error(error);
          setIsError(true);
       });
       setIsSuccess(true);
  } catch (error) {
    console.error('Error handling rating change:', error);
    setIsError(true);
  }
};


const handleStatusClick = async (status: string) => {
  try {
    const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
    const userId = idResponse.data[0].id;
    const reviews = await axios.get(`http://localhost:8080/api/reviews/userId/${userId}`);
    let found = false;
    // Check if review exists and update status
    for (let i = 0; i < reviews.data.length; i++) {
      if (reviews.data[i].mediaId === media.id) {
        reviews.data[i].progress = status;
        console.log('Updated progress:', reviews.data[i].progress);
        const response = await axios.put(`http://localhost:8080/api/reviews/${reviews.data[i].id}`, reviews.data[i]);
        found = true;
      }
    }
    if(!found) {
        createReview({ mediaType: media.mediaType,
                             mediaId: media.id,
                             userId: userId,
                             progress: status,
                             rating: 0,
                             body: '', })
                  .then((response) => {
                  })
                  .catch((error) => {
                    console.error(error);
                    setIsError(true);
                  });
              }

  } catch (error) {
    console.error('Error Updating Status', error);
  }
}


  const handleActionClick = (value: any) => {
  }

  const handleRatingReset = async () => {
      setUserRating(0);
      try {
          const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
          const userId = idResponse.data[0].id;
          const reviews = await axios.get(`http://localhost:8080/api/reviews/userId/${userId}`);
          const matchingReview = reviews.data.find((review: any) => review.mediaId === media.id);
          const reviewId = matchingReview.id;
          const response = await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
      } catch (error) {
            console.error('Error deleting the review:', error);
      }

      setIsModalOpen(false);
  };

  const handleRatingChange = (value: any) => {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    setRating(parseFloat(value));
  }

  const handleToggle = async () => {
      if (!isAuthenticated) {
              loginWithRedirect();
      }
    try {
      const idResponse = await axios.post('http://localhost:8080/api/user/name/' + user?.name);
      const userId = idResponse.data[0].id;
      const favoritesResponse = await axios.get<string[]>(`http://localhost:8080/api/user/getFavorites?id=` + userId);


      if (favorited) {
        // remove from favorites
        const index = favoritesResponse.data.indexOf(media.mediaTitle);

        if (index > -1) {
          favoritesResponse.data.splice(index, 1);
        }
        await axios.post('http://localhost:8080/api/user/setfavoritemedia', {
          id: userId,
          favorites: favoritesResponse.data,
        });
      } else {
        // add to favorites
        if (!favoritesResponse?.data) {
            favoritesResponse.data = [];
        }
        favoritesResponse?.data?.push(media.mediaTitle);
        await axios.post('http://localhost:8080/api/user/setfavoritemedia', {
          id: parseInt(userId),
          favorites: favoritesResponse.data,
        });
      }

      setFavorited(!favorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <>
      {isLoading && <SmallLoading />}
      {doneSearching && media === null &&
        <UhOh />
      }
      {doneSearching && media !== null &&
        <>
          <Container disableGutters maxWidth={false} sx={{ ...mediaPageContainer, mb: 2 }}>
            <Container disableGutters sx={{ display: 'flex' }}>
              <Container disableGutters sx={{ ...leftColumn }}>
                <img src={media?.thumbnail} style={{ ...mediaImage }} />
                <StatusDropdown
                  isOpen={statusDropdownOpen}
                  setOpen={setStatusDropdownOpen}
                  handleClick={(status: string) => {
                    if (isAuthenticated) {
                      handleStatusClick(status);
                    } else {
                      loginWithRedirect();
                    }
                  }}
                  defaultStatus={currentStatus}
                />
                <ActionDropdown
                  isOpen={actionDropdownOpen}
                  setOpen={setActionDropdownOpen}
                  handleClick={() => {
                    if (isAuthenticated) {
                      handleActionClick(null);
                    } else {
                      loginWithRedirect();
                    }
                  }} />
                <h6 style={{ ...rateField }}>Rate</h6>
                <div style={{ display: "flex", alignItems: "center" }}>
                        <RatingStars
                          value={userRating}
                          setValue={(event, newValue) => {
                            if (newValue !== null) {
                              handleQuickRate(newValue);
                            }
                          }}
                        />
                        {userRating > 0 && ( // Conditionally render the "X" button
                                  <IconButton onClick={() => setIsModalOpen(true)} aria-label="reset rating">
                                    <CloseIcon />
                                  </IconButton>
                        )}
                      </div>
                      <ConfirmCancelModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleRatingReset}
                        message="Are you sure you want to reset your rating?"
                      />
                      <SuccessAlert
                            message={"Quick Rating Updated Successfully."}
                            showAlert={isSuccess}
                            setShowAlert={setIsSuccess}
                          />


                <h6 style={{ ...rateField }}>Favorite</h6>
                {<IconButton onClick={handleToggle} aria-label="toggle favorite"
                  sx={{
                    color: favorited ? "#31628F" : "rgba(49, 98, 143, 0.5)", // Active/Inactive color
                    "&:hover": {
                      color: "#274b73" // Darker hover color
                    }
                  }}>
                  {favorited ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>}
                {(media?.mediaType === "TV Show" || media?.mediaType === "Movie") && (
                <div>
                  <h6 style={{ ...rateField }}>Streaming Services</h6>

                  {streamingService.includes("Disney+") && (
                    <img src={disneyPlusLogo} style={{ ...streamingLogo }} />
                  )}

                  {streamingService.includes("Netflix") && (
                    <img src={netflixLogo} style={{ ...streamingLogo }} />
                  )}
                  {streamingService.includes("Amazon Prime Video") && (
                    <img src={primeVideoLogo} style={{ ...streamingLogo }} />
                  )}
                  {streamingService.includes("Google Play") && (
                    <img src={googlePlayLogo} style={{ ...streamingLogo }} />
                  )}

                  {["Disney+", "Netflix", "Amazon Prime Video", "Google Play"].every(
                      (service) => !streamingService.includes(service)
                    ) && <p>Not available for streaming</p>}

                </div>

                )}

              <div style={{ display: media.mediaType === "Movie" || media.mediaType === "TV Show" ? 'block' : 'none' }}>
                <CountryDropdown setSelectedCountryCode={setSelectedCountryCode} />
              </div>

              </Container>
              <Divider orientation="vertical" sx={{ height: 'auto' }} />
              <Container sx={{ ...rightColumn }}>
                <Container disableGutters sx={{ ...mediaDetails }}>
                  <h3 style={{ flexGrow: 1 }}> {media?.mediaTitle}</h3>
                  {/* <h6 style={{ color: 'grey' }}>{media?.publishedDate}</h6> */}
                  <h6>{labels?.createdByLabel} {media?.author}</h6>
                  <Container disableGutters sx={{ ...mediaRatings }}>
                    <Rating
                      sx={{ my: 0, mr: 1 }}
                      value={media?.averageRating}
                      precision={0.5}
                      readOnly
                    />
                    <h5 style={{ marginRight: 10 }}> {media?.averageRating} </h5>
                    <div >
                      {media?.totalRatings} {media?.totalRatings === 1 ? 'Rating • ' : 'Ratings • '}
                      {(media?.numTotalReviews).toLocaleString()} {media?.numTotalReviews === 1 ? 'Review' : 'Reviews'}
                    </div>
                    <Typography
                      variant={'caption'}
                      fontSize={14}
                      sx={{ my: 3 }}>
                      {media?.description}
                    </Typography>
                  </Container>
                </Container>
              </Container >
            </Container >
            <Container sx={{ ...mediaReviews }}>
              <h6>Reviews</h6>
              <ReviewSubsection
                reviews={media?.reviews?.filter(review => review.rating !== 0)}
                setNeedsUpdate={setNeedsUpdate}
              />
              {media?.reviews.length === 0 &&
                <Typography variant="caption">No reviews yet</Typography>
              }
            </Container>
          </Container>
          <CreateReviewButton
            media={media}
            setNeedsUpdate={setNeedsUpdate}
          />
          <ErrorAlert
            message={"Error loading this review"}
            showAlert={isError}
            setShowAlert={setIsError} />
        </>
      }
    </>
  );
}

export default MediaPage;