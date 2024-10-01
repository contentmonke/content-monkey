import './Home.css';

import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from '../../components/Loading';
import { useLocation } from 'react-router-dom';
import Profile from '../profile/Profile';
import Landing from './landing/Landing';
import Secured from './secured/Secured';

function Home() {
  const { isAuthenticated } = useAuth0();
  const { isLoading, error } = useAuth0();
  const { state } = useLocation();

  useEffect(() => {
    console.log("Home page")
    console.log(state)
  }, []);

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
