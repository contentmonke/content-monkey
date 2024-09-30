import './Home.css';

import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from '../../components/Loading';
import { useLocation } from 'react-router-dom';
import Profile from '../profile/Profile';
import Landing from './landing/Landing';
import Secured from './secured/Secured';

function Home() {
  const { isAuthenticated } = useAuth0();
  const { user, isLoading, error } = useAuth0();
  const [userData, setUserData] = useState();
  const { state } = useLocation();

  useEffect(() => {
    console.log("Home page")
    console.log(state)
  }, [])


  useEffect(() => {
    async function fetchData() {
      try {
        if (!isLoading && user?.name) {
          const response = await axios.post('http://localhost:8080/api/user/', { name: user?.name });
          setUserData(response.data);
          console.log(response.data)
        }

      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, [user?.name]);
  // console.log(user);

  return (isLoading ? <Loading /> : (
    <>
      <div className="card">
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            {!isAuthenticated ? (
              <>
                <Landing />
              </>
            ) : (
              <>
                <Secured />
                <Profile />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
  )
}

export default Home;
