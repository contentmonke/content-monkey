import { Dialog, DialogTitle, Stack, TextField, Typography, Checkbox, FormControlLabel, Container } from "@mui/material";
import { Dayjs } from 'dayjs';

import { useRef, useState } from "react";
import { MediaType } from "../../models/Models";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";
import DatePickerField from "../../components/DatePickerField";
import { handleSearchFields } from "./review-utils";
import RatingStars from "../../components/RatingStars";
import { createReview } from "../../api/objects";
import { useLocation, useNavigate } from "react-router-dom";
import { loadSearchResults } from "../search/search-utils";
import { SmallLoading } from "../../components/Loading";
import WarningModal from "../../components/WarningModal";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { modal } from "../../style/review-page";
import ModalHeader from "./ModalHeader";
import MediaSearchBar from "./MediaSearchBar";
import SearchResults from "../search/SearchResults";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalidArgs, setIsInvalidArgs] = useState(false);
  const navigate = useNavigate();
  const dialogTitleRef = useRef<HTMLDivElement>(null);
  // const { state } = useLocation();

  // useEffect(() => {
  //   console.log("Modal page")
  //   console.log(state)
  // }, [])

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
    setPrevSearch(title);
    setResults([]);
    setErrorMessage(`Error searching for '${title}'`);
    loadSearchResults(mediaType, title, setResults, setIsLoading, setIsError);
    setPage(1);
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  const handleBackArrowClick = () => {
    setMedia(null);
    setBody("");
    setRating(0);
    setStartDate(null);
    setEndDate(null);
    setStartedMedia(false);
    setShowWarning(false);
  }

  const isInvalidArguments = () => {
    if (body === "") {
      setIsInvalidArgs(true)
      return true;
    }
    setIsInvalidArgs(false)
    return false;

  }

  const handleCreateReviewClick = async () => {
    if (isInvalidArguments()) {
      return;
    }
    setIsLoading(true);
    setErrorMessage("Error creating the review");
    createReview({ body, mediaType, rating, startDate, endDate })
      .then((response) => {
        console.log("Successfully stored your new review!");
        console.log(response);
        setIsLoading(false);
        handleBackArrowClick();
        setIsSuccess(true)
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
  }

  const handleExpandScreenClick = () => {
    navigate("/createReview",
      {
        state:
        {
          reviewDraft: {
            title: title,
            results: results,
            media: media,
            mediaType: mediaType,
            body: body,
            rating: rating,
            startedMedia: startedMedia,
            startDate: startDate,
            endDate: endDate
          }
        }
      });
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  }


  return (
    <>
      {open ?
        <Dialog open={open}
          onClose={handleClose}
          sx={{ ...modal }}
          scroll="paper"
          PaperProps={{
            ref: dialogTitleRef, // Attach the ref to the paper element
          }}
          fullScreen
        >
          <ModalHeader
            media={media}
            setModalOpen={setModalOpen}
            setShowWarning={setShowWarning}
            handleExpandScreenClick={handleExpandScreenClick}
          />
          <DialogTitle mb={1}>Create A New Review</DialogTitle>
          <Container disableGutters sx={{ width: '80%' }}>
            {(media === null) ?
              <>
                <MediaSearchBar
                  mediaType={mediaType}
                  handleMediaChange={handleMediaChange}
                  title={title}
                  setTitle={setTitle}
                  handleSearchClick={handleSearchClick}
                />
                {/* <div>images of most popular books...</div> */}
                <br />
                {isLoading && <SmallLoading />}
                {results.length > 0 &&
                  <Typography
                    variant={'body2'}
                    textAlign={'left'}>
                    Showing Results for '{prevSearch}'
                  </Typography>
                }
                <SearchResults
                  results={results}
                  page={page}
                  mediaType={mediaType}
                  setMedia={setMedia}
                  handlePageChange={handlePageChange}
                  scrollRef={dialogTitleRef}
                  location={'list'}
                />
              </>
              :
              <>
                {handleSearchFields(mediaType, media)}
                <Stack
                  direction={'row'}
                  justifyContent={'end'}
                  spacing={2}
                  mt={0}
                >
                  <Typography sx={{ pt: 0.5 }}>Rating: </Typography>
                  <RatingStars
                    value={rating}
                    setValue={(event: any) => handleRatingChange(event.target.value)} />
                </Stack>
                <Stack>
                  <TextField
                    label={"What are your thoughts?"}
                    multiline
                    rows={8}
                    value={body}
                    onChange={(event) => setBody(event.target.value)} />
                  {isInvalidArgs &&
                    <Typography color="error">Please enter a valid rating and description</Typography>
                  }
                  <FormControlLabel
                    label={`I have started this ${mediaType.toLowerCase()}`}
                    control={
                      <Checkbox
                        checked={startedMedia}
                        onChange={handleCheckClick}
                      />
                    }
                  />
                </Stack>
                {startedMedia ?
                  <Stack
                    direction={'row'}
                    alignContent={'center'}
                    spacing={2}
                  >
                    <DatePickerField label={"Start Date"} value={startDate} setValue={setStartDate} />
                    <DatePickerField label={"End Date"} value={endDate} setValue={setEndDate} />
                  </Stack>
                  :
                  <></>
                }
                <Stack
                  direction={'row'}
                  justifyContent={'flex-end'}
                  py={5} >
                  <CancelButton onClick={() => setShowWarning(true)} />
                  <ConfirmButton
                    title={'Create Review'}
                    onClick={handleCreateReviewClick} />
                </Stack>
                <WarningModal
                  open={showWarning}
                  setOpen={setShowWarning}
                  handleConfirm={handleBackArrowClick} />
              </>
            }
          </Container>
          <SuccessAlert
            message={"Review successfully created"}
            showAlert={isSuccess}
            setShowAlert={setIsSuccess} />
          <ErrorAlert
            message={errorMessage}
            showAlert={isError}
            setShowAlert={setIsError} />
        </Dialog >
        :
        <></>
      }
    </>
  );
}

export default CreateReviewModal;