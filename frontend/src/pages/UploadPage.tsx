import { Button, Container, Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { api } from "../api/requests";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "./reviews/review-utils";
import { Media, Review } from "../models/Models";
import { fetchMediaList } from "./media/media-utils";
import { SmallLoading } from "../components/Loading";

function UploadPage() {
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  const handleUpload = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userData.id);
    setIsLoading(true);

    api.reviews.uploadReviews(formData)
      .then((response) => {
        console.log(response);
        setReviews(response.data)
        let mediaIds: Number[] = [];
        response.data.forEach(function (review: any) {
          mediaIds.push(review.mediaId)
        });

        if (mediaIds.length > 0) {
          fetchMediaList(mediaIds, setMediaList);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      })
  }

  return (
    <>
      <div>Go to goodreads.com and click "My Books" on the header. On the left menu bar, there is a section called "Tools" - click "Import and export". Click the "Export Library" button to download your csv. Upload this csv using the button below.</div>
      <br />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ display: 'none' }}></input>
      </Button>
      {isLoading && <SmallLoading />}
      {reviews.length > 0 &&
        <>
          {reviews.map(review => {
            const media = mediaList.find(media => media.id === review.mediaId);

            return (
              <>
                <Divider component={'li'} />
                <Container key={review?.mediaId} sx={{ display: "flex" }}>
                  <Container disablegutters sx={{ width: '25%' }}>
                    < img src={media?.thumbnail} style={{ width: 120, height: 'auto' }} />
                  </Container>
                  < Container disableGutters flexGrow={1}>
                    <div>Title: {media?.mediaTitle}</div>
                    <div>Author: {media?.author}</div>
                    <br />
                    <div style={{ fontSize: 12 }}>{media?.description}</div>
                  </Container>
                </Container >
                <Container>
                  <div style={{ textDecoration: 'underline' }}>Your Review</div>
                  <div>Body: {review.body}</div>
                  <div>Rating: {review.rating}</div>
                  <div>DateCreated: {JSON.stringify(review.dateCreated)}</div>
                  <div>StartDate: {JSON.stringify(review.startDate)}</div>
                  <div>EndDate: {JSON.stringify(review.endDate)}</div>
                </Container>
              </>
            );
          })}
        </>
      }
    </>
  );
}

export default UploadPage;