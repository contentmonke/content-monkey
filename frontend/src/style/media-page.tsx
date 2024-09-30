import { SxProps, Theme } from "@mui/material";

export const mediaPageContainer: SxProps<Theme> = {
  width: '100%',
  minWidth: 400,
  maxWidth: 800,
}

export const leftColumn: SxProps<Theme> = {
  width: '30%',
  py: 5
}

export const rightColumn: SxProps<Theme> = {
  width: '60%',
  py: 5,
  textAlign: 'left'
}

export const mediaImage = {
  width: '80%',
  height: 'auto',
  marginBottom: '20px',
  minWidth: 100
}

export const buttonGroup: SxProps<Theme> = {
  flexGrow: 1,
  width: '90%',
  my: 1
}

export const rateField = {
  marginTop: 15,
  marginBottom: 0
}

export const mediaDetails: SxProps<Theme> = {
  height: 'auto',
  minHeight: '70vh'
}

export const mediaRatings: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap'
}

export const mediaReviews: SxProps<Theme> = {
  justifyContent: 'center',
  textAlign: 'left'
}

export const userAccount: SxProps<Theme> = {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: "center",
  width: 'auto',
  minWidth: 75,
  mr: 2
}

export const reviewDetail: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column'
}