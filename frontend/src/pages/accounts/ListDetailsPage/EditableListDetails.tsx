import React, { useState } from "react";
import "./EditableListDetails.css";
import Button from "../../../components/button/Button";
import ListPicture from "./ListPicture";

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
            className="input-field"
          />

          <ListPicture 
            picture={picture} 
            setPicture={setPicture}
          />
  
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="textarea-field"
          />
          <div className="edit-actions">
            <Button
              onClick={handleSave}
              label="Save"
              color="#4caf50"
              hovercolor="#388e3c"
              textcolor="white"
            />
            <Button
              onClick={() => setIsEditing(false)}
              label="Cancel"
              color="#f44336"
              hovercolor="#d32f2f"
              textcolor="white"
            />
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <Button
            onClick={() => setIsEditing(true)}
            label="Edit"
            color="#31628F"
            hovercolor="#25496A"
            textcolor="white"
          />
          <Button
            onClick={onDelete}
            label="Delete"
            color="#f44336"
            hovercolor="#d32f2f"
            textcolor="white"
          />
        </div>
      )}
    </div>
  );
};

export default EditableListDetails;