import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/accounts/AccountPage';
import Home from './pages/home/Home';
import ExampleList from './example/ExampleList';
import SearchPage from './pages/search/SearchPage'
import MediaPage from './pages/media/MediaPage'
import EditProfile from './pages/settings/profile/EditProfile';
import EditAccount from './pages/settings/account/EditAccount';
import { Container } from '@mui/material';
import Navbar from "./components/navbar/Navbar"
import ProtectedRoute from './ProtectedRoute';

function App() {
  // const { isLoading, error } = useAuth0();
  return (
    <Router>
      <Navbar />
      <div className="pages">
        <Container sx={{ mt: 5 }}>
          <Routes>
            {/* Define the route for /account */}
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/examples" element={<ExampleList />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings">
              {/* Default route to render EditProfile */}
              <Route index element={<ProtectedRoute component={EditProfile} />} />

              {/* Other nested routes */}
              <Route path="profile" element={<ProtectedRoute component={EditProfile} />} />
              <Route path="account" element={<ProtectedRoute component={EditAccount} />} />
            </Route>
            <Route path="/media/:title" element={<MediaPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App
