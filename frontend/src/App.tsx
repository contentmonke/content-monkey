import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/accounts/AccountPage';
import Home from './pages/home/Home';
import ExampleList from './example/ExampleList';
import SearchPage from './pages/search/SearchPage'
import MediaPage from './pages/media/MediaPage'
import { Container } from '@mui/material';
import Navbar from "./components/navbar/Navbar"

function App() {
  // const { isLoading, error } = useAuth0();
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Routes>
          {/* Define the route for /account */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/examples" element={<ExampleList />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/media/:title" element={<MediaPage />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
