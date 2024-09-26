import { Dialog, DialogTitle, Stack, TextField, Typography, IconButton, Checkbox, FormControlLabel, ListItemButton, List, Divider, Button, Pagination, Box } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useEffect, useState } from "react";
import { MediaType } from "../../models/Models";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";
import DatePickerField from "../../components/DatePickerField";
import { handleSearchFields } from "./review-utils";
import RatingStars from "../../components/RatingStars";
import { createReview } from "../../api/objects";
import MediaDropdown from "../../components/MediaDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { loadSearchResults } from "../search/search-utils";
import { SmallLoading } from "../../components/Loading";
import WarningModal from "../../components/WarningModal";
import { Close } from "@mui/icons-material";

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
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [page, setPage] = useState(1);
  const [prevSearch, setPrevSearch] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleMediaChange = (value: any) => {
    setMediaType(value);
  }

  const handleCheckClick = () => {
    setStartedMedia(!startedMedia);
  }

  const handleSearchClick = () => {
    setPrevSearch(title)
    setResults([])
    loadSearchResults(mediaType, title, setResults, setIsLoading)
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  const handleBackArrowClick = () => {
    setMedia(null);
    setBody("")
    setRating(0);
    setStartDate(null);
    setEndDate(null);
    setStartedMedia(false)
    setShowWarning(false);
  }

  const handleCreateReviewClick = async () => {
    setIsLoading(true);
    createReview({ body, mediaType, rating, startDate, endDate })
      .then((response) => {
        console.log("Successfully stored your new review!");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleExpandScreenClick = () => {
    navigate("/createReview");
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  }


  return (
    <>
      {open ?
        <Dialog open={open} onClose={handleClose} sx={{
          ...dialogSx
        }} scroll="paper" fullScreen>
          <Stack direction={'row'}
            justifyContent={'space-between'} sx={{ mx: 1, mt: 1 }}>
            {media === null ?
              <IconButton onClick={() => setModalOpen(false)}>
                <Close />
              </IconButton>
              :
              <IconButton onClick={() => setShowWarning(true)}>
                <ArrowBackIosNewIcon />
              </IconButton>
            }
            <IconButton onClick={handleExpandScreenClick}>
              <OpenInFullIcon />
            </IconButton>
          </Stack>
          <DialogTitle mb={2}>Create A New Review</DialogTitle>
          <Stack spacing={1} px={10} pb={3}>
            {/* {(mediaType === MediaType.UNSELECTED || media === null) ? */}
            {(media === null) ?
              <>
                <Stack direction={'row'} sx={{ pt: 1, flexGrow: 1 }}>
                  <MediaDropdown mediaType={mediaType} onChange={handleMediaChange} />
                  <Stack direction={'row'} sx={{ pt: 1, flexGrow: 1 }} justifyContent={'space-between'}>
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)} />
                    <Button variant="contained"
                      size='large'
                      sx={{
                        bgcolor: '#99d2ff', color: 'black', borderRadius: 0, ml: 2, height: 55
                      }}
                      startIcon={<SearchIcon />}
                      onClick={handleSearchClick}
                      disabled={mediaType === MediaType.UNSELECTED || title === ""}>
                      Search
                    </Button>
                  </Stack>
                  {/* <Typography>images of most popular books...</Typography> */}
                </Stack>
                <br />
                {isLoading && <SmallLoading />}
                {results.length > 0 &&
                  <Typography
                    variant={'body2'}
                    textAlign={'left'}
                  >Showing Results for '{prevSearch}'
                  </Typography>
                }
                <List sx={{ padding: 0 }}>
                  {results.length > 0 &&
                    <>
                      {
                        results.map((result, index) => (
                          <div key={index}>
                            <Divider component="li" />
                            <ListItemButton
                              onClick={() => setMedia(result)}
                            >
                              {handleSearchFields(mediaType, result, "list")}
                            </ListItemButton>
                          </div>
                        ))
                      }
                      < Box my={2} display={'flex'} justifyContent={'center'}>
                        <Pagination count={4} page={page} onChange={(event, pageCount) => handlePageChange(pageCount)} />
                      </Box>
                    </>
                  }
                </List>
                {/* </Paper> */}
              </>
              :
              <>
                {handleSearchFields(mediaType, media)}
                < Stack direction={'row'} justifyContent={'end'} spacing={2} mt={0}>
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
                  <CancelButton onClick={() => setShowWarning(true)} />
                  <ConfirmButton title={'Create Review'} onClick={handleCreateReviewClick} />
                </Stack>
                <WarningModal open={showWarning} setOpen={setShowWarning} handleConfirm={handleBackArrowClick} />
              </>
            }
          </Stack >

        </Dialog >
        // </Container>
        :
        <></>
      }
    </>
  );
}

export default CreateReviewModal;