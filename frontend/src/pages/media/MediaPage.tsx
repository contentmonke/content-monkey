import { useEffect, useState } from "react";
import { fetchMedia } from "./media-utils";
import { Media, MediaLabel } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { Container, Divider, Rating, Typography } from "@mui/material";
import { leftColumn, mediaDetails, mediaImage, mediaPageContainer, mediaRatings, mediaReviews, rateField, rightColumn } from "../../style/media-page";
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
import { useParams } from 'react-router-dom';
import axios from 'axios';


function MediaPage() {
  const [media, setMedia] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doneSearching, setDoneSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rating, setRating] = useState(0);
  const [labels, setLabels] = useState<MediaLabel | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const location = useLocation(); // Accessing the state passed from the navbar
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {


    if (location && location.state && location.state.result && needsUpdate) {
      setNeedsUpdate(false);
      fetchMedia(location.state.result, setMedia, setLabels, setIsLoading, setIsError, setDoneSearching);
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


  const handleStatusClick = (value: any) => {
  }

  const handleActionClick = (value: any) => {
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  const handleToggle = async () => {
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
          favoritesResponse.data.push(media.mediaTitle);
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
                  handleClick={() => {
                    if (isAuthenticated) {
                      handleStatusClick(null);
                    } else {
                      loginWithRedirect();
                    }
                  }}
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
                {isAuthenticated ? <RatingStars
                  value={rating}
                  setValue={(event: any) => handleRatingChange(event.target.value)}
                /> : <Button label="Sign in" onClick={() => loginWithRedirect()} />}


                <h6 style={{ ...rateField }}>Favorite</h6>
                {isAuthenticated ? <IconButton onClick={handleToggle} color="primary" aria-label="toggle favorite">
                {favorited ? <StarIcon /> : <StarBorderIcon />}
                </IconButton> : <Button label="Sign in" onClick={() => loginWithRedirect()} />}

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
                reviews={media?.reviews}
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