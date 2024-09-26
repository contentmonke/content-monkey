import '../../App.css';

import { useEffect, useState } from 'react'
import cmLogo from '/monkey.svg'
import ExampleList from '../../example/ExampleList'
import LoginButton from './LoginButton/LoginButton';
import LogoutButton from './LogoutButton/LogoutButton';
import Profile from '../profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import { useLocation } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0)
  const { user, isLoading, error } = useAuth0();
  const [userData, setUserData] = useState();
  const {state} = useLocation();

  useEffect(() => {
    console.log("Home page")
    console.log(state)
  },[])

  
  useEffect(() => {
      async function fetchData() {
        try {
          if (!isLoading && user?.name) {
            console.log("Here")
            // console.log(user?.name);
            const response = await axios.post('http://localhost:8080/api/user/', {name: user?.name});
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

  return ( isLoading ? <Loading /> : (
     <>
      <div>
        <a href="https://purdue.edu" target="_blank">
          <img src={cmLogo} className="logo" alt="CM logo" />
        </a>
      </div>
      <h1>Content Monkey</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className="card">
        <h1>Auth0 Login</h1>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </>
          
        )}
        <ExampleList />
      </div>
    </>
    )
  )
}

export default Home;
