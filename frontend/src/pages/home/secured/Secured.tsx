import { Suspense, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import RecsFormat from '../../../components/RecsFormat';
// Comment the above and uncomment the following to import the WebGL BG lazily for faster loading times
// const Bananas = lazy(() => import('./Bananas'))

function Secured() {
  const { isAuthenticated } = useAuth0();
  const [speed] = useState(1);
  const {user} = useAuth0();
  const [recsList, setRecsList] = useState([]);
  const [highestRatedMedia, setHighestRatedMedia] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const currUserResponse = await axios.post("http://localhost:8080/api/user/", user);
        const recs = await axios.get(`http://localhost:8080/api/user/chat/${currUserResponse.data[0].id}`);
        const highestRated = await axios.get("http://localhost:8080/api/user/highest-rated/");
        setHighestRatedMedia(highestRated.data);
        setRecsList(recs.data);
      } catch (err) {
        console.log("error getting user data");
      }
    }
    console.log(location)
    fetchRecs();
  },[])

  const handleClick = (result: any) => {
    navigate(`/media/${result.title}/${result.mediaType}`, {
      state: {
        result: result
      }
    });
  };

  return (
    isAuthenticated && (
      <div className="the-secured-page">
        <RecsFormat recsList={highestRatedMedia} mediaType={"Book"} />
        <RecsFormat recsList={highestRatedMedia} mediaType={"TV Show"} />
        <RecsFormat recsList={highestRatedMedia} mediaType={"Movie"} />
        <RecsFormat recsList={highestRatedMedia} mediaType={"Video Game"} />
        <Box sx={{ flexGrow: 1 }}>
        <p className="fave-titles">Movies For You</p>
        <hr className="main-divider" />
          <Grid container spacing={2} minHeight={160}>
            {recsList.map((rec: any, i: number) => {
              return rec.mediaType === "Movie" && (
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
        <br />
        <Box sx={{ flexGrow: 1 }}>
        <p className="fave-titles">Video Games For You</p>
        <hr className="main-divider" />
          <Grid container spacing={2} minHeight={160}>
            {recsList.map((rec: any, i: number) => {
              return rec.mediaType === "Video Game" && (
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
        <br />

        <Box sx={{ flexGrow: 1 }}>
        <p className="fave-titles">TV Shows For You</p>
        <hr className="main-divider" />
          <Grid container spacing={2} minHeight={160}>
            {recsList.map((rec: any, i: number) => {
              return rec.mediaType === "TV Show" && (
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
        <br />
        <Box sx={{ flexGrow: 1 }}>
        <p className="fave-titles">Books For You</p>
        <hr className="main-divider" />
          <Grid container spacing={2} minHeight={160}>
            {recsList.map((rec: any, i: number) => {
              return rec.mediaType === "Book" && (
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
      </div>
    )
  );
}

export default Secured;