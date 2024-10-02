import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const EditGenresModal = ({ open, handleClose, favoriteGenres, setFavoriteGenres }) => {
  const [newGenres, setNewGenres] = useState([...favoriteGenres]);
  const { user, isLoading, error, logout } = useAuth0();
  // Handle input change for each genre
  const handleGenreChange = (index, value) => {
    const updatedGenres = [...newGenres];
    updatedGenres[index] = value;
    setNewGenres(updatedGenres);
  };

  // Function to add a new genre if less than 3 are present
  const handleAddGenre = () => {
    if (newGenres.length < 3) {
      setNewGenres([...newGenres, '']); // Add an empty input for new genre
    } else {
      alert('You can only add up to 3 genres.');
    }
  };

  // Function to save edited genres and close modal
  const handleSaveGenres = async () => {
    const validGenres = newGenres.filter((genre) => genre.trim() !== ''); // Filter out any empty genres
    setFavoriteGenres(validGenres);

    try {
      // Make the POST request to update the genres
      const userEditGenre = await axios.post('http://localhost:8080/api/user/name/' + user.name);
      const response = await axios.put('http://localhost:8080/api/user/genres/' + userEditGenre.data[0].id, {
        genres: validGenres // Format the body like the biography
      });

      if (response.status === 200) {
        alert('Favorite genres updated successfully!');
      }
    } catch (error) {
      console.error('Error updating genres:', error);
      alert('Failed to update genres.');
    }

    handleClose(); // Close modal
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Favorite Genres</DialogTitle>
      <DialogContent>
        {newGenres.map((genre, index) => (
          <TextField
            key={index}
            margin="dense"
            label={`Genre ${index + 1}`}
            type="text"
            fullWidth
            value={genre}
            onChange={(e) => handleGenreChange(index, e.target.value)}
          />
        ))}

        {/* Add genre button, disabled if there are already 3 genres */}
        {newGenres.length < 3 && (
          <Button onClick={handleAddGenre} sx={{ marginTop: 2 }}>
            Add Genre
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveGenres}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGenresModal;