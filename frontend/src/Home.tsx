import './App.css';

import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import cmLogo from '/monkey.svg'
import ExampleList from './example/ExampleList'
import LoginButton from './LoginButton/LoginButton';
import LogoutButton from './LogoutButton/LogoutButton';
import Profile from './Profile/Profile';
import AccountPage from './AccountPage/AccountPage';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const [count, setCount] = useState(0)
  const { isLoading, error } = useAuth0();
  return (
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
}

export default Home;
