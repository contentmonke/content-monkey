import { Button, Container, TextField } from "@mui/material";
import MediaDropdown from "../../components/MediaDropdown";
import SearchIcon from '@mui/icons-material/Search';
import { MediaType } from "../../models/Models";
import { searchButton } from "../../style/review-page";

function MediaSearchBar({ mediaType, handleMediaChange, title, setTitle, handleSearchClick }: any) {
  return (
    <Container disableGutters sx={{ display: 'flex', flexGrow: 1, m: 1 }}>
      <MediaDropdown
        mediaType={mediaType}
        onChange={handleMediaChange}
      />
      <TextField
        fullWidth
        label="Search media"
        value={title}
        onChange={(event) => setTitle(event.target.value)} />
      <Button variant="contained"
        sx={{ ...searchButton }}
        startIcon={<SearchIcon />}
        onClick={handleSearchClick}
        disabled={mediaType === MediaType.UNSELECTED || title === ""}>
        Search
      </Button>
    </Container>
  );
}

export default MediaSearchBar;