import { Button, Container, TextField } from "@mui/material";
import MediaDropdown from "../../components/MediaDropdown";
import SearchIcon from '@mui/icons-material/Search';
import { MediaType } from "../../models/Models";
import { searchButton } from "../../style/review-page";

function MediaSearchBar({ mediaType, handleMediaChange, title, setTitle, handleSearchClick }: any) {
  return (
    <Container disableGutters sx={{ display: 'flex', flexGrow: 1 }}>
      <MediaDropdown
        mediaType={mediaType}
        onChange={handleMediaChange}
      />
      <TextField
        fullWidth
        label="Search media"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
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
      />
      <Button variant="contained"
        sx={{ ...searchButton }}
        startIcon={<SearchIcon />}
        onClick={handleSearchClick}
        disabled={title === ""}>
        Search
      </Button>
    </Container>
  );
}

export default MediaSearchBar;