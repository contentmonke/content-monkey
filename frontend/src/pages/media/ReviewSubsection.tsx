import { AccountCircle } from "@mui/icons-material";
import { Container, Divider, Rating, Typography } from "@mui/material";

const reviews = [1, 2, 3, 4]

function ReviewSubsection({ }: any) {
  return (
    <>
      {reviews.map((review, index) => (
        <>
          <Divider />
          <Container disableGutters sx={{ display: 'flex', my: 1 }}>
            <Container disableGutters sx={{ justifyContent: 'left', width: 'auto' }}>
              <AccountCircle fontSize="large" sx={{ ml: 1 }} />
              <Typography variant="caption">Username{index + 1}</Typography>
            </Container>
            <Container disableGutters sx={{ display: 'flex', flexDirection: 'column' }}>
              <Rating
                size={'small'}
                sx={{ my: 0, mr: 1, mb: 0.5 }}
                value={4 - index}
                precision={0.5}
                readOnly
              />
              <Typography variant="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, libero eget ultrices dignissim, justo mauris porttitor tortor, a suscipit risus ipsum et leo. Fusce sit amet ex enim. Nulla facilisi. Ut faucibus elit in odio hendrerit, at finibus lacus dapibus.</Typography>
            </Container>
          </Container>
        </>
      ))}
    </>
  );
}

export default ReviewSubsection