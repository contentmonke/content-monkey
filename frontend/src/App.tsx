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
import Home from './Home';

function App() {
  const [count, setCount] = useState(0)
  const { isLoading, error } = useAuth0();
  return (
      <Router>
          <Routes>
            {/* Define the route for /account */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>
  )
}

export default App
