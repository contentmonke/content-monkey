import { Dialog, DialogTitle, Stack, TextField, Typography, Checkbox, FormControlLabel, Container } from "@mui/material";
import { Dayjs } from 'dayjs';

import { useEffect, useState } from "react";
import { Media } from "../../models/Models";
import CancelButton from "../../components/CancelButton";
import ConfirmButton from "../../components/ConfirmButton";
import DatePickerField from "../../components/DatePickerField";
import RatingStars from "../../components/RatingStars";
import { createReview } from "../../api/objects";
import WarningModal from "../../components/WarningModal";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { createReviewContainer, createReviewImage, createReviewImageContainer, createReviewInfo, createReviewPrompts, modal } from "../../style/review-page";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "./review-utils";
import { ModalHeader } from "./ModalHeader";

type params = {
  open: boolean,
  setModalOpen: any,
  media: Media,
  setNeedsUpdate: any
}

function CreateReviewModal({ open, setModalOpen, media, setNeedsUpdate }: params) {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [startedMedia, setStartedMedia] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalidArgs, setIsInvalidArgs] = useState(false);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);


  const handleClose = () => {
    setModalOpen(false);
  }

  const handleCheckClick = () => {
    setStartedMedia(!startedMedia);
  }

  const handleRatingChange = (value: any) => {
    setRating(parseFloat(value));
  }

  const handleClearReview = () => {
    setBody("");
    setRating(0);
    setStartDate(null);
    setEndDate(null);
    setStartedMedia(false);
    setIsInvalidArgs(false)
    setModalOpen(false)
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
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    setIsLoading(true);
    setErrorMessage("Error creating the review");
    const mediaType = media.mediaType;
    const mediaId = media.id;
    const userId = userData.id;
    createReview({ body, mediaType, mediaId, userId, rating, startDate, endDate })
      .then((response) => {
        console.log("Successfully stored your new review!");
        console.log(response);
        setIsLoading(false);
        handleClearReview();
        setIsSuccess(true)
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setNeedsUpdate(true)
      })
  }


  return (
    <>
      {open ?
        <Dialog open={open}
          onClose={handleClose}
          sx={{ ...modal }}
          scroll="paper"
          fullScreen
        >
          <ModalHeader
            media={media}
            setModalOpen={setModalOpen}
            setShowWarning={setShowWarning}
          />
          <DialogTitle mb={1}>Create A New Review</DialogTitle>
          <Container disableGutters sx={{ ...createReviewContainer }}>
            <Container disableGutters sx={{ ...createReviewInfo }}>
              <Container disableGutters sx={{ ...createReviewImageContainer }}>
                < img
                  src={media.thumbnail}
                  style={{ ...createReviewImage }}>
                </img>
              </Container >
              <Container disableGutters sx={{ ...createReviewPrompts }}>
                <Stack
                  direction={'row'}
                  justifyContent={'start'}
                  spacing={2}
                  mt={0}
                >
                  <Typography sx={{ pt: 0.5 }}>Rating: </Typography>
                  <RatingStars
                    value={rating}
                    setValue={(event: any) => handleRatingChange(event.target.value)} />
                </Stack>
                <Stack >
                  <TextField
                    label={"What are your thoughts?"}
                    multiline
                    rows={8}
                    sx={{
                      mb: 1,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#31628F",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "#31628F", // Change label color on focus
                        },
                      },
                    }}
                    value={body}
                    onChange={(event) => setBody(event.target.value)} />
                  {isInvalidArgs &&
                    <Typography color="error">Please enter a valid rating and description</Typography>
                  }
                  <FormControlLabel
                    label={`I have started this ${media.mediaType?.toLowerCase()}`}
                    control={
                      <Checkbox
                        checked={startedMedia}
                        onChange={handleCheckClick}
                        sx={{
                          color: "#31628F", // Default color
                          "&.Mui-checked": {
                            color: "#31628F", // Color when checked
                          },
                        }}
                      />
                    }
                  />
                  {startedMedia ?
                    <Stack
                      direction={'row'}
                      alignContent={'center'}
                      spacing={2}
                      sx={{
                        mt: 2
                      }}
                    >
                      <DatePickerField label={"Start Date"} value={startDate} setValue={setStartDate} />
                      <DatePickerField label={"End Date"} value={endDate} setValue={setEndDate} />
                    </Stack>
                    :
                    <></>
                  }
                </Stack>
              </Container>
            </Container>
            <Stack
              direction={'row'}
              justifyContent={'flex-end'}
              pt={5}
              pb={6}
              pr={9}
            >
              <CancelButton onClick={() => setShowWarning(true)} />
              <ConfirmButton
                title={'Create Review'}
                onClick={handleCreateReviewClick}
                disabled={body === "" || rating === 0}
              />
            </Stack>
          </Container>
          <WarningModal
            open={showWarning}
            setOpen={setShowWarning}
            handleConfirm={handleClearReview}
          />
        </Dialog >
        :
        <></>
      }
      <SuccessAlert
        message={"Review successfully created"}
        showAlert={isSuccess}
        setShowAlert={setIsSuccess}
      />
      <ErrorAlert
        message={errorMessage}
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </>
  );
}

export default CreateReviewModal;