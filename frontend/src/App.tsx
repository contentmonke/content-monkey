import './App.css';

import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/accounts/AccountPage';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/home/Home';
import ExampleList from './example/ExampleList';
import CreateReviewPage from './pages/reviews/CreateReviewPage';
import SearchPage from './pages/search/SearchPage'
import MediaPage from './pages/media/MediaPage'
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import CustomAppBar from './components/CustomAppBar';

function App() {
  // const { isLoading, error } = useAuth0();
  return (
    <Router>
      <CustomAppBar />
      <Container sx={{ mt: 5 }}>
        <Routes>
          {/* Define the route for /account */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/createReview" element={<CreateReviewPage />} />
          <Route path="/examples" element={<ExampleList />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/media/:id" element={<MediaPage />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
