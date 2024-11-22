import React, { useState } from "react";
import "./EditableListDetails.css";

interface EditableListDetailsProps {
  listDetails: {
    id: number;
    name: string;
    picture?: string;
    description?: string;
  };
  onUpdate: (updatedList: { name?: string; picture?: string; description?: string }) => void;
  onDelete: () => void;
}

const EditableListDetails: React.FC<EditableListDetailsProps> = ({ listDetails, onUpdate, onDelete }) => {
  const [name, setName] = useState(listDetails.name);
  const [picture, setPicture] = useState(listDetails.picture || "");
  const [description, setDescription] = useState(listDetails.description || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate({ name, picture, description });
    setIsEditing(false);
  };

  return (
    <div className="editable-list-details">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="List Name"
          />
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Picture URL"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableListDetails;