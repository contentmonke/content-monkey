import { Container, Dialog, Typography, Stack } from "@mui/material";
import axios from "axios";
import { modal } from "../../../style/review-page";
import { AddContentHeader } from "./AddContentHeader";
import { MediaType, VolumeInfo } from "../../../models/Models";
import { useRef, useState } from "react";
import MediaSearchBar from "../../reviews/MediaSearchBar";
import { loadSearchResults } from "../../search/search-utils";
import { SmallLoading } from "../../../components/Loading";
import SearchResults from "../../search/SearchResults";
import ConfirmButton from "../../../components/ConfirmButton";
import CancelButton from "../../../components/CancelButton";
import { getYear } from "../../upload/upload-utils";

import { api } from "../../../api/requests";

type editParams = {
  listid: any,
  refreshListPage: any,
  open: any,
  setOpen: any,
  handleClose: any,
}

function AddContentModal({ listid, refreshListPage, open, setOpen, handleClose }: editParams) {

  const [mediaType, setMediaType] = useState(MediaType.UNSELECTED);
  const [searchEntity, setSearchEntity] = useState<VolumeInfo>(null);
  // Review Components
  const [title, setTitle] = useState("");
  // UI Helpers
  const [isInvalidArgs, setIsInvalidArgs] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [prevSearch, setPrevSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const dialogTitleRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaToAdd, setMediaToAdd] = useState<any>(null);


  const fetchMedia = async () => {
    api.media.fetchMedia(searchEntity)
      .then((response) => {
        setMediaToAdd(response.data);
        addMediaToList(response.data);
        setIsError(false);
      })
      .catch((error) => {
        setMediaToAdd(null);
        setIsError(true);
      })
  }

  const addMediaToList = async (media: any) => {
    if (media) {
      console.log(media);
      try {
        // Send a request to add the mediaId to the list
        await axios.post(`http://localhost:8080/api/lists/${listid}/add-media`, null, {
          params: {
            mediaId: media.id
          }
        });

        refreshListPage();
      } catch (error) {
        console.error("Error adding media to list:", error);
      }
    }
  };

  const handleMediaChange = (value: any) => {
    setMediaType(value);
    console.log(value);
  }

  const handleSearchClick = () => {
    setPrevSearch(title);
    setResults([]);
    setErrorMessage(`Error searching for '${title}'`);
    loadSearchResults(mediaType, title, setResults, setIsLoading, setIsError);
    setPage(1);
  }

  const handleChangeMedia = (replacementMedia: any) => {
    setSearchEntity(replacementMedia);
    setSearchIsOpen(false);
  }

  const addToList = async () => {
    await fetchMedia();
    refreshListPage();
    setOpen(false);
    handleClose;
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
          <AddContentHeader
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
            onClose={handleClose}
          />
          <br />
          <Container disableGutters sx={{ width: '80%' }}>
            {searchIsOpen ?
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
                      src={searchEntity?.thumbnail}>
                    </img>
                  </div>
                  <div className="result-info">
                    <div className="result-title">{searchEntity?.title}</div>
                    <div className="result-date">{getYear(searchEntity?.publishedDate)}</div>
                    <br />
                    <div>{searchEntity?.description} </div>
                  </div>
                </div>

                <Stack
                  direction={'row'}
                  justifyContent={'flex-end'}
                  py={5} >
                  <CancelButton onClick={() => setSearchIsOpen(true)} />
                  <ConfirmButton
                    title={'Add to List'}
                    onClick={() => addToList()} />
                </Stack>
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

export default AddContentModal;