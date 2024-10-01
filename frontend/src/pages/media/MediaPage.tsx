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


function MediaPage() {
  const [media, setMedia] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doneSearching, setDoneSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rating, setRating] = useState(0);
  const [labels, setLabels] = useState<MediaLabel | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const location = useLocation(); // Accessing the state passed from the navbar


  useEffect(() => {
    if (location && location.state && location.state.result) {
      fetchMedia(location.state.result, setMedia, setLabels, setIsLoading, setIsError, setDoneSearching);
    }
  }, []);


  const handleStatusClick = (value: any) => {
  }

  const handleActionClick = (value: any) => {
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

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
                  handleClick={handleStatusClick}
                />
                <ActionDropdown
                  isOpen={actionDropdownOpen}
                  setOpen={setActionDropdownOpen}
                  handleClick={handleActionClick} />
                <h6 style={{ ...rateField }}>Rate</h6>
                <RatingStars
                  value={rating}
                  setValue={(event: any) => handleRatingChange(event.target.value)}
                />
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
                    <div >{media?.totalRatings} Ratings • {(2000).toLocaleString()} Reviews</div>
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
              <ReviewSubsection />
            </Container>
          </Container>
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