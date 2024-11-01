import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MediaType } from "../models/Models";

function MediaDropdown({ mediaType, onChange }: any) {
  return (
    <FormControl sx={{ minWidth: 95, mr: 1 }}>
      <InputLabel id="media-field-id"
        sx={{
          "&.Mui-focused": {
            color: "#31628F",
          },
        }}
      >Media Type</InputLabel>
      <Select
        value={mediaType}
        label={"Media Type"}
        labelId="media-field-id"
        onChange={(event) => onChange(event.target.value)}
        sx={{
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#31628F",
          },
        }}
      >
        <MenuItem value={MediaType.UNSELECTED}>-----</MenuItem>
        <MenuItem value={MediaType.BOOK}>Book</MenuItem>
        <MenuItem value={MediaType.MOVIE}>Movie</MenuItem>
        <MenuItem value={MediaType.TV_SHOW}>TV Show</MenuItem>
        <MenuItem value={MediaType.VIDEO_GAME}>Video Game</MenuItem>
      </Select>
    </FormControl>
  );
}

export default MediaDropdown;