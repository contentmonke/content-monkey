import { Dialog, Rating, DialogContentText, DialogTitle, styled, Paper, Card, Stack, Select, MenuItem, InputLabel, FormControl, TextField, Container, FormLabel, Typography, IconButton, Checkbox, FormControlLabel, Button } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { useState } from "react";
import { MediaType } from "../../models/Models";

const dialogSx = {
  py: 5,
  px: 10,
  minWidth: 500,
  maxWidth: 1000,
  margin: 'auto',
  textAlign: 'center'

}

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function CreateReviewModal({ open, setModalOpen }: any) {
  const [title, setTitle] = useState("");
  const [mediaSelected, setMediaSelected] = useState(true);
  const [media, setMedia] = useState(MediaType.UNSELECTED);
  const [startedMedia, setStartedMedia] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleClose = () => {
    setModalOpen(false);
  }

  const handleMediaChange = (value: any) => {
    setMedia(value);
  }

  const handleCheckClick = (value: any) => {
    setStartedMedia(!startedMedia);
  }

  return (
    <>
      {open ?
        <Dialog open={open} onClose={handleClose} sx={{
          ...dialogSx
        }} scroll="paper" fullScreen>

          <Grid sx={{ textAlign: 'right', mx: 1, mt: 1 }}>
            <IconButton>
              <OpenInFullIcon />
            </IconButton>
          </Grid>
          <DialogTitle mb={2}>
            Create A New Review
          </DialogTitle>
          <Stack spacing={2} px={10} pb={3}>
            {mediaSelected ?
              <>
                {/* <Grid container spacing={2}> */}
                <Stack direction={'row'}>
                  <img src="https://ew.com/thmb/RNSjDY3vXsAmYPgvzNG-SbZibYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/minalima_hp1_flat_compressed-f9e6bda269a545a28f8bd9e50ed5f70b.jpg" width='200'></img>
                  {/* <Stack textAlign='end' sx={{ pt: 10, pr: 2, pl: 3, fontWeight: 'bold' }}> */}
                  <Stack direction={'column'} sx={{ flexGrow: 1, pt: 5, pr: 2, pl: 3 }}>
                    <Stack direction={'row'} py={1}>
                      <Typography width={100} textAlign={'right'} fontWeight={'bold'} pr={2}>Title:</Typography>
                      <Typography >Titlejjjj jjjjj jjjjjjjjjj jjjjjjjjjjj jjj jj</Typography>
                    </Stack>
                    <Stack direction={'row'} py={1}>
                      <Typography width={100} textAlign={'right'} fontWeight={'bold'} pr={2}>Media:</Typography>
                      <Typography >Titlejjjj jjjjj jjjjjjjjjj jjjjjjjjjjj jjj jj</Typography>
                    </Stack>
                    <Stack direction={'row'} py={1}>
                      <Typography width={100} textAlign={'right'} fontWeight={'bold'} pr={2}>Author(s):</Typography>
                      <Typography >Titlejjjj jjjjj jjjjjjjjjj jjjjjjjjjjj jjj jj</Typography>
                    </Stack>
                    <Stack direction={'row'} py={1}>
                      <Typography width={100} textAlign={'right'} fontWeight={'bold'} pr={2}>Published:</Typography>
                      <Typography >1999</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                {/* </Grid> */}

                <Stack direction={'row'} justifyContent={'space-between'}>
                  <TextField label={"Review Title"} sx={{ width: '50%' }} />
                  <Rating sx={{ my: 1 }} name="half-rating" defaultValue={0} precision={0.5} />
                </Stack>
                <TextField label={"What are your thoughts?"} multiline rows={8} />
                <FormControlLabel
                  label="I have started this {media}"
                  control={
                    <Checkbox
                      checked={startedMedia}
                      onChange={handleCheckClick}
                    />
                  }
                />
                {startedMedia ?
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <Stack direction={'row'} alignContent={'center'} spacing={2}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                        />

                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                        />
                      </Stack>
                    </DemoContainer>
                  </LocalizationProvider>
                  : <></>}
                <Stack direction={'row'} justifyContent={'flex-end'} py={5} >
                  <Button variant="outlined" size='large' sx={{ borderRadius: 28, mr: 2 }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size='large' sx={{ bgcolor: '#99d2ff', color: 'black', borderRadius: 28, ml: 2 }}>
                    Create Review
                  </Button>
                </Stack>

              </> :
              <Grid container spacing={2}>
                <FormControl sx={{ m: 1, minWidth: 95 }}>
                  <InputLabel id="media-field-id">Media Type</InputLabel>
                  <Select
                    value={media}
                    label={"Media Type"}
                    labelId="media-field-id"
                    onChange={(event) => handleMediaChange(event.target.value)}
                  >
                    <MenuItem value={MediaType.UNSELECTED}>-----</MenuItem>
                    <MenuItem value={MediaType.BOOK}>Book</MenuItem>
                    <MenuItem value={MediaType.MOVIE}>Movie</MenuItem>
                    <MenuItem value={MediaType.TV_SHOW}>TV Show</MenuItem>
                    <MenuItem value={MediaType.VIDEO_GAME}>Video Game</MenuItem>
                  </Select>
                </FormControl>
                <Grid sx={{ pt: 1 }}>
                  <TextField id="outlined-search" label="Search field" type="search" />
                </Grid>
                <Typography>images of most popular books...</Typography>
              </Grid>
            }
          </Stack>

        </Dialog >
        // </Container>
        :
        <></>
      }
    </>
  );
}

export default CreateReviewModal;