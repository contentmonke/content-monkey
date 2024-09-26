import { useState } from "react";
import { Loading, SmallLoading } from "../../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MediaType, VolumeInfo } from "../../models/Models";
import { loadSearchResults } from "./search-utils";
import { Stack, TextField, Typography, ListItemButton, List, Divider, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { handleSearchFields } from "../reviews/review-utils";
import MediaDropdown from "../../components/MediaDropdown";





function SearchPage() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<VolumeInfo[]>([]);
  const [isLoading, setIsLoading] = useState("");
  const [mediaType, setMediaType] = useState(MediaType.BOOK);
  const [media, setMedia] = useState(null);


  const handleMediaChange = (value: any) => {
    setMediaType(value);
  }

  const handleSearchClick = () => {
    loadSearchResults(mediaType, title, setResults, setIsLoading)
  }


  return (
    <div>
      {isLoading && <SmallLoading />}
      <Stack spacing={1} px={10} pb={3}>
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
                </Stack>
                <br />
                {isLoading && <SmallLoading />}
                {results.length > 0 &&
                  <Typography
                    variant={'body2'}
                    textAlign={'left'}
                  >{results.length} Results for {title}
                  </Typography>
                }
                <List sx={{ padding: 0 }}>
                  {results.length > 0 && results.map((result, index) => (
                    <div key={index}>
                      <Divider component="li" />
                      <ListItemButton
                        onClick={() => setMedia(result)}
                      >
                        {handleSearchFields(mediaType, result, "list")}
                      </ListItemButton>
                    </div>

                  ))}
                </List>
              </>
              :
              <>
              {handleSearchFields(mediaType, media)}

                
                
              </>
            }
          </Stack>

    </div>
  );
}

export default withAuthenticationRequired(SearchPage, {
  onRedirecting: () => <Loading />,
});
