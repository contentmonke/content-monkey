import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditableListDetails from "./EditableListDetails";
import './ListDetailsPage.css';

interface ListEntity {
  id: number;
  name: string;
  picture?: string;
  description?: string;
  upVotes: number;
  downVotes: number;
  media: string[];
  userId: number; // Owner ID
}

const ListDetailsPage: React.FC = () => {
  const { id, listid } = useParams<{ id: string; listid: string }>();
  const [listDetails, setListDetails] = useState<ListEntity | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/lists/${listid}`);
        const listData = response.data;
        setListDetails(listData);

        // Check ownership
        const currentUserId = parseInt(id || "", 10);
        setIsOwner(listData.userId === currentUserId);
      } catch (error) {
        console.error("Error fetching list details:", error);
      }
    };

    if (listid) {
      fetchListDetails();
    }
  }, [listid, id]);

  const handleUpdate = async (updatedList: { name?: string; picture?: string; description?: string }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/lists/${listid}`, updatedList);
      setListDetails((prevDetails) => (prevDetails ? { ...prevDetails, ...updatedList } : null));
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/lists/${listid}`);
      window.location.href = `/u/${id}/lists`; // Redirect to user's lists page
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div className="list-details-page">
      {listDetails ? (
        <div className="list-details">
          <h2>{listDetails.name}</h2>
          {listDetails.picture && <img src={listDetails.picture} alt={listDetails.name} />}
          <p>{listDetails.description}</p>
          <p>Upvotes: {listDetails.upVotes}</p>
          <p>Downvotes: {listDetails.downVotes}</p>
          <h3>Media in this List:</h3>
          <ul>
            {listDetails.media?.map((mediaItem, index) => (
              <li key={index}>{mediaItem}</li>
            ))}
          </ul>

          {isOwner && (
            <EditableListDetails
              listDetails={listDetails}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </div>
      ) : (
        <p>Loading list details...</p>
      )}
    </div>
  );
};

export default ListDetailsPage;