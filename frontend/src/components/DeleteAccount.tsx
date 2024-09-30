import React from 'react';
import { Button } from '@mui/material';

// Define the component
const DeleteAccount = ({ onDelete }) => {
  // Function to handle delete confirmation and click
  const handleDelete = () => {
    const confirmation = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
      onDelete(); // Call the passed in delete function
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'lightcoral', // Light red background
        color: 'white',
        '&:hover': {
          backgroundColor: 'red', // Darker red on hover
        },
        padding: '10px 20px',
        fontWeight: 'bold',
      }}
      onClick={handleDelete} // Attach the handler
    >
      Delete Account
    </Button>
  );
};

export default DeleteAccount;