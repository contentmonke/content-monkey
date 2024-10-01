import './Home.css';

import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from '../../components/Loading';
import { useLocation } from 'react-router-dom';
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
    <div className="card">
      {error && <h1>Authentication Error</h1>}
      {!error && isLoading && <h1>Loading...</h1>}
      {!error && !isLoading && (
        <>
          {!isAuthenticated ? (
            <>
              <Landing />
            </>
          ) : (
            <>
              <Secured />
            </>
          )}
        </>
      )}
    </div>
  )
  )
}

export default Home;
