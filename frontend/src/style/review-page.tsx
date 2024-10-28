import { SxProps, Theme } from "@mui/material";

export const fabButton: SxProps<Theme> = {
  position: 'fixed',
  bottom: 30,
  right: 30,
  backgroundColor: '#99d2ff',
  '&:hover': {
    bgcolor: '#5db8ff',
  },
}

export const modalHeader: SxProps<Theme> = {
  display: 'flex',
  width: 'auto',
  justifyContent: 'space-between',
  mx: 1,
  mt: 1,
  // bgcolor: 'red'
}

export const modal: SxProps<Theme> = {
  py: 5,
  px: 10,
  minWidth: 550,
  maxWidth: 1000,
  margin: 'auto',
  textAlign: 'center'
}

export const searchButton: SxProps<Theme> = {
  bgcolor: '#99d2ff',
  color: 'black',
  borderRadius: 0,
  ml: 1,
  height: 55,
  py: 3,
  px: 4,
  width: 'auto'
}

export const resultImageContainer: SxProps<Theme> = {
  alignContent: 'center',
  width: '25%',
  // minWidth: 100,
  // maxWidth: 150,
  mr: 3
}

export const resultImage = {
  width: '100%',
  height: 'auto'
}

export const fieldLabel = {
  textAlign: 'right',
  fontWeight: 'bold',
  pr: 2
}

export const pagination = {
  display: 'flex',
  justifyContent: 'center',
  my: 2
}

export const fieldContent: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  textAlign: 'left'
}

export const fullpageContainer: SxProps<Theme> = {
  minWidth: '600px',
  maxWidth: '750px',
  minHeight: '90vh',
  height: 'auto'
}

export const newFullpageContainer: SxProps<Theme> = {
  minWidth: '600px',
  maxWidth: '900px',
  minHeight: '90vh',
  height: 'auto'
}

export const createReviewContainer: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  mt: 2
}

export const createReviewInfo: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  px: 6
}

export const createReviewImageContainer: SxProps<Theme> = {
  width: '40%',
  justifyContent: 'right'
}

export const createReviewImage = {
  width: '80%',
  height: 'auto',
  minWidth: 150,
  maxWidth: 180
}

export const createReviewPrompts: SxProps<Theme> = {
  flexGrow: 1,
  mx: 3,
  textAlign: 'left'
}