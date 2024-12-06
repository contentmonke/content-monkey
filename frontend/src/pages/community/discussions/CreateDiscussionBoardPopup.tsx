import React, { useState } from "react";
import "./DiscussionPage.css"; // Assuming the styles below are in this file.

const CreateDiscussionBoardPopup = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title); // Pass the title back to the parent
      setTitle(""); // Clear the textbox
      onClose(); // Close the popup
    }
  };

  if (!isOpen) return null; // If not open, render nothing

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create New Discussion Board</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter discussion board title"
        />
        <div className="popup-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!title.trim()} className="submit-button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussionBoardPopup;
