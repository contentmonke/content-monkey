import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMedia } from "./media-utils";
import { Media, MediaLabel } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { Box, Button, ButtonGroup, Container, Divider, Rating, Stack, Typography } from "@mui/material";
import { leftColumn, mediaImage, mediaPageContainer, rightColumn } from "../../style/media-page";
import StatusDropdown from "./StatusDropdown";
import ActionDropdown from "./ActionDropdown";
import RatingStars from "../../components/RatingStars";
import { AccountCircle } from "@mui/icons-material";
import ReviewSubsection from "./ReviewSubsection";

function MediaPage() {
  const { id } = useParams();
  const [media, setMedia] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rating, setRating] = useState(0);
  const [labels, setLabels] = useState<MediaLabel | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    fetchMedia(id, setMedia, setLabels, setIsLoading, setIsError);

  }, [id])

  const handleStatusClick = (value: any) => {
    // setRating(parseFloat(value));
  }

  const handleActionClick = (value: any) => {
    // setRating(parseFloat(value));
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  return (
    <>
      <Container maxWidth={false} sx={{ ...mediaPageContainer }}>
        <Container sx={{ ...leftColumn }}>
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
          <h6 style={{ marginTop: 25, marginBottom: 0 }}>Rate</h6>
          <RatingStars
            value={rating}
            setValue={(event: any) => handleRatingChange(event.target.value)}
          />
        </Container>
        <Divider orientation="vertical" sx={{ height: 'auto' }} />
        <Container sx={{ ...rightColumn, textAlign: 'left' }}>
          <Container disableGutters sx={{ height: 'auto', minHeight: '70vh' }}>
            <h3 style={{ flexGrow: 1 }
            } > {media?.title}</h3>
            <h6 style={{ color: 'grey' }}>{media?.publishedDate}</h6>
            <h6>{labels?.createdByLabel} {media?.authors}</h6>
            <Container disableGutters sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Rating
                sx={{ my: 0, mr: 1 }}
                value={rating}
                precision={0.5}
                readOnly
              />
              <h5 style={{ marginRight: 10 }}>5.0</h5>
              <div >{(10000).toLocaleString()} Ratings • {(2000).toLocaleString()} Reviews</div>
              <div style={{ paddingTop: 20, paddingBottom: 20 }}>{media?.description}</div>
            </Container>
          </Container>
          <Container disableGutters>
            <h6>Reviews</h6>
            <ReviewSubsection />
          </Container>
        </Container >
      </Container >

    </>
  );
}

export default MediaPage;