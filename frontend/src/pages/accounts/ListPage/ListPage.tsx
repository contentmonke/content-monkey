import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavBar from '../UserNavbar';
import { Modal, TextField, Box } from '@mui/material';
import Button from '../../../components/button/Button';
import './ListPage.css';
import { IconButton, Typography, Container } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react"; // Assuming you're using Auth0 for authentication

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL
  const [lists, setLists] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');

  const [isOwner, setIsOwner] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (isAuthenticated && user?.name) {
          const response = await axios.post("http://localhost:8080/api/user/", { name: user.name });
          if (response.data.length > 0) {
            const currentUser = response.data[0];
            setCurrentUserId(currentUser.id);
            // Compare the current user's ID with the list owner's ID
            if (id && response.data[0].id == id) {
              setIsOwner(true);
            } else {
              setIsOwner(false);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [user]);

  const fetchLists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/${id}/lists`); // Fetch lists for the user
      setLists(response.data);
    } catch (err) {
      console.error('Error fetching lists', err);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      setError('List name cannot be empty');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/lists/create', null, {
        params: {
          name: newListName, // The list name
          userId: id, // The user ID
        },
      });
      setModalOpen(false);
      setNewListName('');
      fetchLists(); // Refresh the list after creating a new one
    } catch (err) {
      console.error('Error creating list', err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [id]);

  return (
    <div className="content-page-container">
      <UserNavBar />

      <div className="list-page-container">
        {/* Create New List Section */}

        {isOwner ? (<>
          <div className="create-list-container">
            <Button
              label="Create New List"
              onClick={() => setModalOpen(true)}
              width="215px"
            />
          </div>

          <hr />
        </>) : (<></>)}

        <div className="list-container">
          {lists.map((list: any) => (
            <div key={list.id} className="list-card" onClick={() => navigate(`/u/${id}/li/${list.id}`)}>
              <img
                src={list.picture || 'https://via.placeholder.com/300'}
                alt={list.name}
                className="list-thumbnail"
              />
              <div className="list-content">
                <div className="list-title">{list.name}</div>
                <div className="list-description">
                  {list.description || 'No description available.'}
                </div>
                <div className="list-votes">
                  <Container disableGutters className="review-vote-container">
                    <IconButton size="small">
                      <ThumbUp sx={{ width: 15 }} />
                    </IconButton>
                    <Typography variant="caption">{list.upVotes || 0}</Typography>
                    <IconButton size="small">
                      <ThumbDown sx={{ width: 15 }} />
                    </IconButton>
                    <Typography variant="caption">{list.downVotes || 0}</Typography>
                  </Container>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Creating a New List */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #31628F',
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="create-list-caption">
              Create a New List
            </div>

            <TextField
              fullWidth
              variant="outlined"
              label="List Name"
              value={newListName}
              onChange={(e) => {
                setNewListName(e.target.value);
                setError(''); // Clear error on input
              }}
              error={!!error}
              helperText={error}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#31628F',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#31628F',
                },
              }}
            />
            <Button
              label="Create"
              onClick={handleCreateList}
              color="#31628F"
              hovercolor="#25496A"
              textcolor="white"
              width="100%"
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ListPage;