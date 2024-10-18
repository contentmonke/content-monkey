import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '../../../components/button/Button'

const EditGenresModal = ({ open, handleClose, favoriteGenres, setFavoriteGenres }) => {
  const [newGenres, setNewGenres] = useState([...favoriteGenres]);
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

    // try {
    //   // Make the POST request to update the genres
    //   const userEditGenre = await axios.post('http://localhost:8080/api/user/name/' + user.name);
    //   const response = await axios.put('http://localhost:8080/api/user/genres/' + userEditGenre.data[0].id, {
    //     genres: validGenres // Format the body like the biography
    //   });

    //   if (response.status === 200) {
    //     alert('Favorite genres updated successfully!');
    //   }
    // } catch (error) {
    //   console.error('Error updating genres:', error);
    //   alert('Failed to update genres.');
    // }

    handleClose(); // Close modal
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '300px', backgroundColor: '#f5f5f5' } }} // Set modal width and background color
    >
      <DialogTitle>Edit Favorite Genres</DialogTitle> {/* Custom title color */}
      <DialogContent>
        {newGenres.map((genre, index) => (
          <TextField
            key={index}
            margin="dense"
            type="text"
            fullWidth
            value={genre}
            onChange={(e) => handleGenreChange(index, e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#31628F', // Border color when focused
                },
              },
            }}
          />
        ))}

        {/* Add genre button, disabled if there are already 3 genres */}
        {newGenres.length < 3 && (
          <div className="add-genre-button">
            <Button
              onClick={handleAddGenre}
              label="Add Genre"
              width="100%"
              color="transparent"
              hovercolor="transparent"
              textcolor="#BDBDBD"
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          label='Confirm'
          width="150px"
          onClick={handleSaveGenres}
        >
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGenresModal;