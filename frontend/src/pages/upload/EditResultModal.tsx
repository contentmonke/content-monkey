import { Checkbox, Container, Dialog, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { modal } from "../../style/review-page";
import { UploadModalHeader } from "../reviews/ModalHeader";
import RatingStars from "../../components/RatingStars";
import DatePickerField from "../../components/DatePickerField";
import CancelButton from "../../components/CancelButton";
import WarningModal from "../../components/WarningModal";
import { MediaType, UploadResult, VolumeInfo } from "../../models/Models";
import { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import MediaSearchBar from "../reviews/MediaSearchBar";
import { loadSearchResults } from "../search/search-utils";
import { SmallLoading } from "../../components/Loading";
import SearchResults from "../search/SearchResults";
import ConfirmButton from "../../components/ConfirmButton";
import { getYear } from "./upload-utils";
import "./UploadPage.css";

type editParams = {
  open: any,
  handleClose: any,
  result: UploadResult
}

function EditResultModal({ open, handleClose, result }: editParams) {

  const [searchEntity, setSearchEntity] = useState<VolumeInfo>(result.searchEntity);
  // Review Components
  const [title, setTitle] = useState(result.searchEntity.title);
  const [body, setBody] = useState(result.reviewEntity.body);
  const [rating, setRating] = useState(result.reviewEntity.rating);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(result.reviewEntity.startDate));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(result.reviewEntity.endDate));
  // UI Helpers
  const [startedMedia, setStartedMedia] = useState(result.reviewEntity.startDate !== null);
  const [showWarning, setShowWarning] = useState(false);
  const [isInvalidArgs, setIsInvalidArgs] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [prevSearch, setPrevSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const dialogTitleRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMediaChange = () => { }

  const handleCloseEditModal = () => {
    setBody("");
    setRating(0);
    setStartDate(null);
    setEndDate(null);
    setStartedMedia(false);
    setIsInvalidArgs(false);
    setShowWarning(false);
    handleClose();
  }

  const handleSearchClick = () => {
    setPrevSearch(title);
    setResults([]);
    setErrorMessage(`Error searching for '${title}'`);
    loadSearchResults(MediaType.BOOK, title, setResults, setIsLoading, setIsError);
    setPage(1);
  }

  const handleChangeMedia = (replacementMedia: any) => {
    setSearchEntity(replacementMedia);
    setSearchIsOpen(false);
  }

  // const isInvalidArguments = () => {
  //   if (body === "") {
  //     setIsInvalidArgs(true)
  //     return true;
  //   }
  //   setIsInvalidArgs(false)
  //   return false;
  // }

  const updateReview = () => {
    result.searchEntity = searchEntity;
    result.reviewEntity.body = body;
    result.reviewEntity.rating = rating;
    result.reviewEntity.dateCreated = dayjs().toDate();
    result.reviewEntity.startDate = startDate.toDate();
    result.reviewEntity.endDate = endDate.isValid() ? endDate.toDate() : null;
    console.log(result);
    handleClose();

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
          <UploadModalHeader
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
            setShowWarning={setShowWarning}
          />
          <br />
          <Container disableGutters sx={{ width: '80%' }}>
            {searchIsOpen ?
              <>
                <MediaSearchBar
                  mediaType={MediaType.BOOK}
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
                  mediaType={MediaType.BOOK}
                  handleClick={(value) => handleChangeMedia(value)}
                  handlePageChange={(value) => setPage(value)}
                  scrollRef={dialogTitleRef}
                  location={'list'}
                />
              </>
              :
              <>
                {/* {handleSearchFields(MediaType.BOOK, searchedResult)} */}
                <div className="item-content">
                  <div>
                    < img className="item-img"
                      src={searchEntity.thumbnail}>
                    </img>
                  </div>
                  <div className="result-info">
                    <div className="result-title">{searchEntity.title}</div>
                    <div className="result-date">{getYear(searchEntity.publishedDate)}</div>
                    <br />
                    <div>Written by: {searchEntity.authors} </div>
                  </div>
                </div>
                <Stack
                  direction={'row'}
                  justifyContent={'end'}
                  spacing={2}
                  mt={0}
                >
                  <Typography sx={{ pt: 0.5 }}>Rating: </Typography>
                  <RatingStars
                    value={rating}
                    setValue={(event: any) => {
                      setRating(parseFloat(event.target.value))
                    }} />
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
                    label={"I have started this book"}
                    control={
                      <Checkbox
                        checked={startedMedia}
                        onChange={() => setStartedMedia(!startedMedia)}
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
                    title={'Update Review'}
                    onClick={() => updateReview()} />
                </Stack>
                <WarningModal
                  open={showWarning}
                  setOpen={setShowWarning}
                  handleConfirm={() => handleCloseEditModal()}
                />
              </>
            }
          </Container>
        </Dialog >
        :
        <></>
      }
    </>
  );
}

export default EditResultModal;