import { Box, Grid2 as Grid } from '@mui/material'

const RecsFormat = ({ onClick, recsList, mediaType }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <p className="fave-titles">Community Favorites {mediaType}s</p>
      <hr className="main-divider" />
      <Grid container spacing={2} minHeight={160}>
        {recsList.map((rec: any, i: number) => {
          return rec.mediaType === mediaType && (
            <Grid display="flex" justifyContent="center" alignItems="center" size="grow" key={i}>
              <div>
                <img onClick={() => onClick(rec)} className='content-item img-size' src={rec?.thumbnail} />
                <p onClick={() => onClick(rec)}>{rec.mediaTitle}</p>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default RecsFormat