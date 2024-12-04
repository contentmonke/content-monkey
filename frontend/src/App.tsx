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
import UploadPage from './pages/upload/UploadPage';
import FriendsPage from './pages/accounts/FriendsPage/FriendsPage';
import ContentPage from './pages/accounts/ContentPage/ContentPage';
import ActivityPage from './pages/accounts/ActivityPage/ActivityPage';
import ListPage from './pages/accounts/ListPage/ListPage';
import ListDetailsPage from './pages/accounts/ListDetailsPage/ListDetailsPage';
import CommunityPage from './pages/community/CommunityPage';
import MyGroupsPage from './pages/community/my-groups/MyGroupsPage';
import PopularGroupsPage from './pages/community/popular-groups/PopularGroupsPage';
import GroupPage from './pages/community/group/GroupPage';
import DiscussionPage from './pages/community/discussions/DiscussionPage';
import CreateGroupPage from './pages/community/create-group/CreateGroupPage';
import GroupInvitationsPage from './pages/community/invitations/GroupInvitationsPage';
import SearchGroupsPage from './pages/community/search/SearchGroupsPage';
import ManageGroupsPage from './pages/community/manage-groups/ManageGroupsPage';

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
            <Route path="/u/:id" element={<AccountPage />} />
            <Route path="/u/:id/friends" element={<FriendsPage />} />
            <Route path="/u/:id/content/*" element={<ContentPage />} />
            <Route path="/u/:id/activity/*" element={<ActivityPage />} />
            <Route path="/u/:id/lists" element={<ListPage />} />
            <Route path="/u/:id/li/:listid" element={<ListDetailsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/create-group" element={<CreateGroupPage />} />
            <Route path="/community/explore" element={<CommunityPage />} />
            <Route path="/community/invitations" element={<GroupInvitationsPage />} />
            <Route path="/community/my-groups" element={<MyGroupsPage />} />
            <Route path="/community/manage-group/:groupId" element={<ManageGroupsPage />} />
            <Route path="/community/popular" element={<PopularGroupsPage />} />
            <Route path="/community/search" element={<SearchGroupsPage />} />
            <Route path="/community/group/:groupId" element={<GroupPage />} />
            <Route path="/community/group/:id/discussion/:discussionId" element={<DiscussionPage />} />
            <Route path="/examples" element={<ExampleList />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings">
              {/* Default route to render EditProfile */}
              <Route index element={<ProtectedRoute component={EditProfile} />} />

              {/* Other nested routes */}
              <Route path="profile" element={<ProtectedRoute component={EditProfile} />} />
              <Route path="account" element={<ProtectedRoute component={EditAccount} />} />
            </Route>
            <Route path="/media/:title/:type" element={<MediaPage />} />
            <Route path="/upload" element={<ProtectedRoute component={UploadPage} />} />
            <Route path="/discussion" element={<DiscussionPage/>} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App
