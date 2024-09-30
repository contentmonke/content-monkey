import { Container, Divider, List, ListItemButton, Pagination } from "@mui/material";
import { handleSearchFields } from "../reviews/review-utils";
import { pagination } from "../../style/review-page";
import { RefObject } from "react";

type customParams = {
  results: any[],
  page: any,
  mediaType: any,
  setMedia: any,
  handlePageChange: any,
  scrollRef: RefObject<HTMLDivElement>,
  location: string
}


function SearchResults({ results, page, mediaType, setMedia, handlePageChange, scrollRef, location }: customParams) {

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChangeLocal = (pageCount: any) => {
    handlePageChange(pageCount);
    scrollToTop();
  }

  return (
    <List sx={{ padding: 0 }}>
      {results.length > 0 &&
        <>
          {results.slice((page - 1) * 10, (page * 10)).map((result, index) => (
            <div key={index}>
              <Divider component="li" />
              <ListItemButton
                onClick={() => setMedia(result)}
              >
                {handleSearchFields(mediaType, result, location)}
              </ListItemButton>
            </div>
          ))}
          <Container sx={{ ...pagination }}>
            <Pagination
              count={Math.ceil(results.length / 10)}
              page={page}
              onChange={(event, pageCount) => handlePageChangeLocal(pageCount)}
            />
          </Container>
        </>
      }
    </List>
  );
}

export default SearchResults;