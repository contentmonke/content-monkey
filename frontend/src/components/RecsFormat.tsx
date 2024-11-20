import { Box, Grid2 as Grid } from '@mui/material'
import React from 'react'

const RecsFormat = ({recsList, mediaType}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <p className="fave-titles">Community Favorites {mediaType}s</p>
    <hr className="main-divider" />
      <Grid container spacing={2} minHeight={160}>
        {recsList.map((rec: any, i: number) => {
          return rec.mediaType === mediaType && (
              <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
                <div>
                <img className='content-item .img-size' src={rec?.thumbnail} />
                {/* <br /> */}
                <p>{rec.mediaTitle}</p>
                </div>
              </Grid>
        )
        })}
      </Grid>
    </Box>
  )
}

export default RecsFormat