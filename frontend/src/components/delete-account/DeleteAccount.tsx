import './DeleteAccount.css'

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
    <button
      className="bad-button"
      onClick={handleDelete} // Attach the handler
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;