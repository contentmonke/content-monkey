import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MediaType } from "../../models/Models";

const exampleBook = {
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J.K. Rowling",
  published: "1997"
}

export function loadMedia() {
  return [exampleBook];
}

const selectedSx = {
  flexGrow: 1,
  pt: 2,
  pr: 2,
  pl: 3
}

const listSx = {
  flexGrow: 1,
  pt: 0,
  pr: 1,
  pl: 3
}

export function handleMediaFields(mediaType: MediaType, location = "") {

  let imgSize, sx, py, fontSize, width;

  if (location == "list") {
    imgSize = 75;
    sx = listSx;
    fontSize = 12;
    width = 100;
    ;
  } else {
    imgSize = 150;
    py = 1;
    sx = selectedSx;
    fontSize = 15;
    width = 110;
  }

  if (mediaType !== MediaType.BOOK) {
    return <></>
  }

  return (
    <Stack direction={'row'}>
      <Grid sx={{ width: imgSize }}>
        <img src="https://ew.com/thmb/RNSjDY3vXsAmYPgvzNG-SbZibYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/minalima_hp1_flat_compressed-f9e6bda269a545a28f8bd9e50ed5f70b.jpg" style={{ width: '100%', height: 'auto' }}></img>
      </Grid>
      <Stack direction={'column'} sx={{ ...sx }}>
        <Stack direction={'row'} py={py}>
          <Typography fontSize={fontSize} width={width} textAlign={'right'} fontWeight={'bold'} pr={2}>Title:</Typography>
          <Typography fontSize={fontSize}>{exampleBook.title}</Typography>
        </Stack>
        <Stack direction={'row'} py={py}>
          <Typography fontSize={fontSize} width={width} textAlign={'right'} fontWeight={'bold'} pr={2}>Media:</Typography>
          <Typography fontSize={fontSize}>{mediaType}</Typography>
        </Stack>
        <Stack direction={'row'} py={py}>
          <Typography fontSize={fontSize} width={width} textAlign={'right'} fontWeight={'bold'} pr={2}>Author(s):</Typography>
          <Typography fontSize={fontSize}>{exampleBook.author}</Typography>
        </Stack>
        <Stack direction={'row'} py={py}>
          <Typography fontSize={fontSize} width={width} textAlign={'right'} fontWeight={'bold'} pr={2}>Published:</Typography>
          <Typography fontSize={fontSize}>{exampleBook.published}</Typography>
        </Stack>
      </Stack>
    </Stack>

  );
}