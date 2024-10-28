import { useRef, useState, useEffect } from "react";
import { Loading, SmallLoading } from "../../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Media, MediaType, VolumeInfo } from "../../models/Models";
import { loadSearchResults } from "./search-utils";
import { Typography, Button, Box, Container } from "@mui/material";
import { handleSearchFields } from "../reviews/review-utils";
import ErrorAlert from "../../components/ErrorAlert";
import SearchResults from "./SearchResults";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { newFullpageContainer } from "../../style/review-page";
import { useLocation } from 'react-router-dom';

import MediaSearchBar from "../reviews/MediaSearchBar";


function SearchPage() {
  const location = useLocation(); // Accessing the state passed from the navbar

  const [title, setTitle] = useState((location && location.state) ? location.state.searchQuery : "");
  const [results, setResults] = useState<VolumeInfo[]>([]);
  const [isLoading, setIsLoading] = useState("");
  const [mediaType, setMediaType] = useState(MediaType.BOOK);
  const [media, setMedia] = useState<Media | null>(null);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const dialogTitleRef = useRef<HTMLDivElement>(null);


  const handleMediaChange = (value: any) => {
    setMediaType(value);
  }

  const handleSearchClick = () => {
    setPrevSearch(title);
    loadSearchResults(mediaType, title, setResults, setIsLoading, setIsError)
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  }

  const handleBackArrowClick = () => {
    setMedia(null);
  }

  useEffect(() => {
    if (location && location.state && location.state.searchQuery) {
      setTitle(location.state.searchQuery);
      setPrevSearch(location.state.searchQuery);
      loadSearchResults(mediaType, location.state.searchQuery, setResults, setIsLoading, setIsError)
    }
  }, [location.state]);

  return (
    <>
      <Container
        disableGutters
        maxWidth={true}
        sx={{ ...newFullpageContainer }}
      >
        {media !== null &&
          <Box textAlign={'left'}>
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => handleBackArrowClick()}
              sx={{ color: '#000000' }}
            >
              Back to Search
            </Button>
          </Box>
        }
        <br />
        <Container disableGutters sx={{ width: '100%', maxWidth: '1000px' }}>
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
              {results.length === 0 &&
                  <Typography
                    variant={'body2'}
                    textAlign={'left'}>
                    No results for '{prevSearch}'
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
            </>
          }
        </Container>
      </Container >
      <ErrorAlert
        message={`Error searching for '${title}'`}
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </ >
  );
}

export default withAuthenticationRequired(SearchPage, {
  onRedirecting: () => <Loading />,
});
