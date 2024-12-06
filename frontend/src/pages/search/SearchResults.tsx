import { Divider, List, ListItemButton } from "@mui/material";
import { handleSearchFields } from "../reviews/review-utils";
import { RefObject } from "react";
import CustomPagination from "../../components/CustomPagination";

type customParams = {
  results: any[],
  page: any,
  mediaType: any,
  handleClick: any,
  handlePageChange: any,
  scrollRef: RefObject<HTMLDivElement>,
  location: string
}


function SearchResults({ results, page, mediaType, handleClick, handlePageChange, scrollRef, location }: customParams) {
  let filteredResults;
  if (mediaType === "---") {
    filteredResults = results;
  } else {
    filteredResults = results.filter(result => result.mediaType === mediaType)
  }
  return (
    <List sx={{ padding: 0 }}>
      {filteredResults.length > 0 &&
        <>
          {filteredResults.slice((page - 1) * 10, (page * 10)).map((result, index) => (
            <div key={index}>
              <Divider component="li" />
              <ListItemButton
                onClick={() => handleClick(result)}
              >
                {handleSearchFields(mediaType, result, location)}
              </ListItemButton>
            </div>
          ))}
          <CustomPagination
            scrollRef={scrollRef}
            items={filteredResults}
            page={page}
            handlePageChange={handlePageChange}
          />
        </>
      }
    </List>
  );
}

export default SearchResults;