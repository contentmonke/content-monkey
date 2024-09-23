import { Dialog, DialogTitle, Stack, TextField, Typography, IconButton, Checkbox, FormControlLabel, ListItemButton, List } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Grid from '@mui/material/Grid2';
import { Dayjs } from 'dayjs';

import { useState } from "react";
import { MediaType } from "../../models/Models";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";
import DatePickerField from "../../components/DatePickerField";
import { handleMediaFields, loadMedia } from "./review-utils";
import RatingStars from "../../components/RatingStars";
import { createReview } from "../../api/objects";
import MediaDropdown from "../../components/MediaDropdown";
import { useNavigate } from "react-router-dom";

const dialogSx = {
  py: 5,
  px: 10,
  minWidth: 500,
  maxWidth: 1000,
  margin: 'auto',
  textAlign: 'center'

}

function CreateReviewModal({ open, setModalOpen }: any) {
  const [mediaType, setMediaType] = useState(MediaType.UNSELECTED);
  const [media, setMedia] = useState(null);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [startedMedia, setStartedMedia] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  // TODO - pull from API
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleMediaChange = (value: any) => {
    setMediaType(value);
  }

  const handleCheckClick = (value: any) => {
    setStartedMedia(!startedMedia);
  }

  const handleCancelClick = (value: any) => {
    setModalOpen(false);
  }

  const handleResults = () => {
    setResults(loadMedia())
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  const handleCreateReviewClick = async () => {
    createReview({ body, mediaType, rating, startDate, endDate })
      .then((response) => {
        console.log("Successfully stored your new review!");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleExpandScreenClick = () => {
    navigate("/createReview");
  }


  return (
    <>
      {open ?
        <Dialog open={open} onClose={handleClose} sx={{
          ...dialogSx
        }} scroll="paper" fullScreen>
          <Grid sx={{ textAlign: 'right', mx: 1, mt: 1 }}>
            <IconButton onClick={handleExpandScreenClick}>
              <OpenInFullIcon />
            </IconButton>
          </Grid>
          <DialogTitle mb={2}>Create A New Review</DialogTitle>
          <Stack spacing={2} px={10} pb={3}>
            {(mediaType === MediaType.UNSELECTED || media === null) ?
              <>
                <Stack direction={'row'} sx={{ pt: 1, flexGrow: 1 }}>
                  <MediaDropdown mediaType={mediaType} onChange={handleMediaChange} />
                  <Stack direction={'row'} sx={{ pt: 1, flexGrow: 1 }} justifyContent={'space-between'}>
                    <TextField id="outlined-search" label="Search field" type="search" />
                    <ConfirmButton title={"Search"} onClick={handleResults} />
                  </Stack>
                  {/* <Typography>images of most popular books...</Typography> */}
                </Stack>
                <List>
                  {results.map((element) => (
                    <ListItemButton key={element.title}
                      onClick={() => setMedia(element)}>
                      {handleMediaFields(mediaType, "list")}
                    </ListItemButton>
                  ))}
                </List>
              </>
              :
              <>
                {handleMediaFields(mediaType)}
                < Stack direction={'row'} justifyContent={'end'} spacing={2}>
                  <Typography sx={{ pt: 0.5 }}>Rating: </Typography>
                  <RatingStars value={rating} setValue={(event: any) => handleRatingChange(event.target.value)} />
                </Stack>
                <TextField
                  label={"What are your thoughts?"}
                  multiline
                  rows={8}
                  value={body}
                  onChange={(event) => setBody(event.target.value)} />
                <FormControlLabel
                  label={`I have started this ${mediaType.toLowerCase()}`}
                  control={
                    <Checkbox
                      checked={startedMedia}
                      onChange={handleCheckClick}
                    />
                  }
                />
                {startedMedia ?
                  <Stack direction={'row'} alignContent={'center'} spacing={2}>
                    <DatePickerField label={"Start Date"} value={startDate} setValue={setStartDate} />
                    <DatePickerField label={"End Date"} value={endDate} setValue={setEndDate} />
                  </Stack>
                  :
                  <></>
                }
                <Stack direction={'row'} justifyContent={'flex-end'} py={5} >
                  <CancelButton onClick={handleCancelClick} />
                  <ConfirmButton title={'Create Review'} onClick={handleCreateReviewClick} />
                </Stack>
              </>
            }
          </Stack>

        </Dialog >
        // </Container>
        :
        <></>
      }
    </>
  );
}

export default CreateReviewModal;