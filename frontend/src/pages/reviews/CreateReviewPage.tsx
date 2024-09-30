import { Dayjs } from "dayjs";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadSearchResults } from "../search/search-utils";
import { createReview } from "../../api/objects";
import { Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { MediaType } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { handleSearchFields } from "./review-utils";
import RatingStars from "../../components/RatingStars";
import DatePickerField from "../../components/DatePickerField";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";
import WarningModal from "../../components/WarningModal";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import MediaSearchBar from "./MediaSearchBar";
import SearchResults from "../search/SearchResults";
import { fullpageContainer } from "../../style/review-page";


function CreateReviewPage() {
  const { state } = useLocation();
  const reviewDraft = state?.reviewDraft
  const [mediaType, setMediaType] = useState(reviewDraft?.mediaType ?? MediaType.UNSELECTED);
  const [media, setMedia] = useState(reviewDraft?.media ?? null);
  const [body, setBody] = useState(reviewDraft?.body ?? "");
  const [rating, setRating] = useState(reviewDraft?.rating ?? 0);
  const [startedMedia, setStartedMedia] = useState(reviewDraft?.startedMedia ?? false);
  const [startDate, setStartDate] = useState<Dayjs | null>(reviewDraft?.startDate ?? null);
  const [endDate, setEndDate] = useState<Dayjs | null>(reviewDraft?.endDate ?? null);
  const [title, setTitle] = useState(reviewDraft?.title ?? "");
  const [results, setResults] = useState<any[]>(reviewDraft?.results ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [page, setPage] = useState(1);
  const [prevSearch, setPrevSearch] = useState(reviewDraft?.title ?? "");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInvalidArgs, setIsInvalidArgs] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dialogTitleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      setIsInvalidArgs(true);
      return true;
    }
    setIsInvalidArgs(false);
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
        navigate("/createReview", { state: null });
        setIsSuccess(true)
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      });
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  }


  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ ...fullpageContainer }}
      >
        {media !== null &&
          <Box textAlign={'left'}>
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => setShowWarning(true)}
              sx={{ color: '#99d2ff' }}
            >
              Back to Search
            </Button>
          </Box>
        }
        <Typography
          variant={'caption'}
          fontSize={22}
        >
          Create A New Review
        </Typography>
        <br />
        <br />
        <Container disableGutters sx={{ width: '90%' }}>
          {(media === null) ?
            <>
              <MediaSearchBar
                mediaType={mediaType}
                handleMediaChange={handleMediaChange}
                title={title}
                setTitle={setTitle}
                handleSearchClick={handleSearchClick}
              />
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
                location={'page'}
              />
            </>
            :
            <>
              {handleSearchFields(mediaType, media)}
              < Stack
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
                <ConfirmButton title={'Create Review'} onClick={handleCreateReviewClick} />
              </Stack>
              <WarningModal
                open={showWarning}
                setOpen={setShowWarning}
                handleConfirm={handleBackArrowClick} />
            </>
          }
        </Container>
      </Container>
      <SuccessAlert
        message={"Review successfully created"}
        showAlert={isSuccess}
        setShowAlert={setIsSuccess} />
      <ErrorAlert
        message={errorMessage}
        showAlert={isError}
        setShowAlert={setIsError} />
    </>
  );

}

export default CreateReviewPage;