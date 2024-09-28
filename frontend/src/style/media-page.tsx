import { SxProps, Theme } from "@mui/material";

export const mediaPageContainer: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  minWidth: 200,
  maxWidth: 1000,
  // height: '100vh',
  // bgcolor: 'yellow',
}

export const leftColumn: SxProps<Theme> = {
  // bgcolor: 'red',
  width: '30%',
  py: 5
}

export const rightColumn: SxProps<Theme> = {
  // bgcolor: 'yellow',
  width: '60%',
  py: 5,
}

export const mediaImage = {
  width: '80%',
  height: 'auto',
  marginBottom: '20px',
  minWidth: 100
}

export const buttonGroup: SxProps<Theme> = {
  flexGrow: 1,
  width: '100%',
  my: 1
}