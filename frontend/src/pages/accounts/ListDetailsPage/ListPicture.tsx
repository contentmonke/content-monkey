import React, { useState, useRef, useEffect } from 'react';
import { Edit as EditIcon } from '@mui/icons-material'; // Only for the pencil icon
import './ListPicture.css'; // CSS for the profile picture component

interface ListPictureProps {
  picture: string | null;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
}

const ListPicture: React.FC<ListPictureProps> = ({ picture, setPicture }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Reference for the dropdown

  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false); // Close the menu if clicking outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setPicture(null);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="list-picture-wrapper">
      <img
        src={picture || 'https://via.placeholder.com/150'}
        alt="List Picture"
        className="list-picture"
      />

      {/* Always visible edit button inside the circle */}
      <button className="list-picture-edit-icon" onClick={toggleMenu}>
        <EditIcon />
        <span>Edit</span>
      </button>

      {/* Dropdown menu for uploading/removing photo */}
      {isMenuVisible && (
        <div className="list-edit-menu" ref={menuRef}>
          <label className="list-edit-menu-item">
            Upload a photo...
            <input type="file" onChange={handleProfilePictureUpload} hidden />
          </label>
          <button className="list-edit-menu-item" onClick={handleRemovePhoto}>
            Remove photo
          </button>
        </div>
      )}
    </div>
  );
};

export default ListPicture;