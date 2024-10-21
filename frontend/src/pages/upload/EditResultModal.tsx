import { Checkbox, Container, Dialog, DialogTitle, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { createReviewContainer, createReviewImage, createReviewImageContainer, createReviewInfo, createReviewPrompts, modal } from "../../style/review-page";
import ModalHeader from "../reviews/ModalHeader";
import RatingStars from "../../components/RatingStars";
import DatePickerField from "../../components/DatePickerField";
import CancelButton from "../../components/CancelButton";
import WarningModal from "../../components/WarningModal";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

function EditResultModal() {
  // function EditResultModal({ open, handleClose, result }: any) {
  return (
    <></>
    // <>
    //   {open ?
    //     <Dialog open={open}
    //       onClose={handleClose}
    //       sx={{ ...modal }}
    //       scroll="paper"
    //       fullScreen
    //     >
    //       <DialogTitle mb={1}>Create A New Review</DialogTitle>
    //       <Container disableGutters sx={{ ...createReviewContainer }}>
    //         <Container disableGutters sx={{ ...createReviewInfo }}>
    //           <Container disableGutters sx={{ ...createReviewImageContainer }}>
    //             < img
    //               src={result.thumbnail}
    //               style={{ ...createReviewImage }}>
    //             </img>
    //           </Container >
    //           <Container disableGutters sx={{ ...createReviewPrompts }}>
    //             <Stack
    //               direction={'row'}
    //               justifyContent={'start'}
    //               spacing={2}
    //               mt={0}
    //             >
    //               <Typography sx={{ pt: 0.5 }}>Rating: </Typography>
    //               <RatingStars
    //                 value={rating}
    //                 setValue={(event: any) => handleRatingChange(event.target.value)} />
    //             </Stack>
    //             <Stack >
    //               <TextField
    //                 label={"What are your thoughts?"}
    //                 multiline
    //                 rows={8}
    //                 sx={{ mb: 1 }}
    //                 value={body}
    //                 onChange={(event) => setBody(event.target.value)} />
    //               {isInvalidArgs &&
    //                 <Typography color="error">Please enter a valid rating and description</Typography>
    //               }
    //               <FormControlLabel
    //                 label={`I have started this ${media.mediaType.toLowerCase()}`}
    //                 control={
    //                   <Checkbox
    //                     checked={startedMedia}
    //                     onChange={handleCheckClick}
    //                   />
    //                 }
    //               />
    //               {startedMedia ?
    //                 <Stack
    //                   direction={'row'}
    //                   alignContent={'center'}
    //                   spacing={2}
    //                 >
    //                   <DatePickerField label={"Start Date"} value={startDate} setValue={setStartDate} />
    //                   <DatePickerField label={"End Date"} value={endDate} setValue={setEndDate} />
    //                 </Stack>
    //                 :
    //                 <></>
    //               }
    //             </Stack>
    //           </Container>
    //         </Container>
    //         <Stack
    //           direction={'row'}
    //           justifyContent={'flex-end'}
    //           pt={5}
    //           pb={6}
    //           pr={9}
    //         >
    //           {/* <CancelButton onClick={() => setShowWarning(true)} />
    //           <ConfirmButton
    //             title={'Create Review'}
    //             onClick={handleCreateReviewClick}
    //             disabled={body === "" || rating === 0}
    //           /> */}
    //         </Stack>
    //       </Container>
    //       <WarningModal
    //         open={showWarning}
    //         setOpen={setShowWarning}
    //         handleConfirm={handleClearReview}
    //       />
    //     </Dialog >
    //     :
    //     <></>
    //   }
    //   <SuccessAlert
    //     message={"Review successfully created"}
    //     showAlert={isSuccess}
    //     setShowAlert={setIsSuccess}
    //   />
    //   <ErrorAlert
    //     message={errorMessage}
    //     showAlert={isError}
    //     setShowAlert={setIsError}
    //   />
    // </>
  );
}

export default EditResultModal;