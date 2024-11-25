import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Assuming you're using Auth0 for authentication
import EditableListDetails from "./EditableListDetails";
import "./ListDetailsPage.css";

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
  const { id: userIdFromUrl, listid } = useParams<{ id: string; listid: string }>();
  const { user, isAuthenticated } = useAuth0();
  const [listDetails, setListDetails] = useState<ListEntity | null>(null);
  const [isOwner, setIsOwner] = useState(false);
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
            if (listDetails && currentUser.id === listDetails.userId) {
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
  }, [user, isAuthenticated, listDetails]);

  const fetchListDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lists/${listid}`);
      setListDetails(response.data);
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  useEffect(() => {
    if (listid) {
      fetchListDetails();
    }
  }, [listid]);

  const handleUpdate = async (updatedList: { name?: string; picture?: string; description?: string }) => {
    try {
      await axios.post(`http://localhost:8080/api/lists/${listid}`, updatedList);
      setListDetails((prevDetails) => (prevDetails ? { ...prevDetails, ...updatedList } : null));
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/lists/${listid}`);
      window.location.href = `/u/${userIdFromUrl}/lists`; // Redirect to user's lists page
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      await axios.post(`http://localhost:8080/api/lists/${listid}/${type}`, null, {
        params: { userId: currentUserId }, // Include the userId
      });
      // Update UI after successful vote
      if (listid) {
        fetchListDetails();
      }
    } catch (error) {
      console.error(`Error ${type}ing the list:`, error);
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

          {isOwner ? (
            <EditableListDetails
              listDetails={listDetails}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ) : (
            <div className="vote-buttons">
              <button onClick={() => handleVote("upvote")} className="upvote-button">
                Upvote
              </button>
              <button onClick={() => handleVote("downvote")} className="downvote-button">
                Downvote
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading list details...</p>
      )}
    </div>
  );
};

export default ListDetailsPage;