import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react"; // Assuming you're using Auth0 for authentication
import EditableListDetails from "./EditableListDetails";
import "./ListDetailsPage.css";
import Button from '../../../components/button/Button';
import { Media } from "../../../models/Models";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { IconButton, Typography, Container } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

import AddContentModal from "./AddContentModal";

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
  const [listMedia, setListMedia] = useState<Media[] | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // adding media ㅠㅠ
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const closeEdit = () => {
    setIsEditing(false);
  }

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

      const response2 = await axios.get(`http://localhost:8080/api/lists/${listid}/details`);
      setListMedia(response2.data)
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  useEffect(() => {
    if (listid) {
      fetchListDetails();
    }
  }, [listid, isEditing]);

  const handleUpdate = async (updatedList: { name?: string; picture?: string; description?: string }) => {
    try {
      await axios.put(`http://localhost:8080/api/lists/${listid}`, updatedList);
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

  const handleRemoveMedia = async (mediaId: number) => {
    try {
      // API call to remove the media from the list
      await axios.delete(`http://localhost:8080/api/lists/${listid}/remove-media`, {
        params: { mediaId },
      });

      fetchListDetails();
    } catch (error) {
      console.error("Error removing media from the list:", error);
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

  const handleDragEnd = async (result: DropResult) => {
    // If dropped outside the list or no destination
    if (!result.destination) return;

    // Create a new list with the reordered items
    const reorderedMedia = Array.from(listMedia);
    const [reorderedItem] = reorderedMedia.splice(result.source.index, 1);
    reorderedMedia.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for responsiveness
    setListMedia(reorderedMedia);

    try {
      // Send media IDs in new order to backend
      const mediaIds = reorderedMedia.map(media => media.id);
      await axios.put(`http://localhost:8080/api/lists/${listid}/update-order`, mediaIds);
    } catch (error) {
      console.error("Error updating media order:", error);
      // Optionally, revert local state if backend update fails
      fetchListDetails();
    }
  };

  return (
    <div className="list-details-page">
      {listDetails ? (
        <div className="list-details">
          {listDetails.picture && <img src={listDetails.picture} alt={listDetails.name} className="list-details-picture" />}
          <h2>{listDetails.name}</h2>
          <p>{listDetails.description}</p>
          <Container disableGutters className="review-vote-container">
            <IconButton size="small" onClick={() => handleVote("upvote")} >
              <ThumbUp sx={{ width: 21 }} />
            </IconButton>
            <Typography variant="caption">{listDetails.upVotes}</Typography>
            <IconButton size="small" onClick={() => handleVote("downvote")}>
              <ThumbDown sx={{ width: 21 }} />
            </IconButton>
            <Typography variant="caption">{listDetails.downVotes}</Typography>
          </Container>

          {isOwner ? (<>
            <EditableListDetails
              listDetails={listDetails}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />

            <div className="add-content-list-button">
              <Button
                label="Add Content"
                onClick={handleEditClick}
                color="#31628F"
                hovercolor="#25496A"
                textcolor="white"
                width="100%"
              />
            </div>
          </>
          ) : (<></>)}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="media-list">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="media-list"
                >
                  {listMedia?.map((mediaItem: Media, index) => (
                    <Draggable
                      key={mediaItem.id}
                      draggableId={`media-${mediaItem.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="media-item"
                        >
                          <img
                            src={mediaItem.thumbnail}
                            alt={mediaItem.mediaTitle}
                            className="media-poster"
                          />
                          <div className="media-info">
                            <h4>{mediaItem.mediaTitle}</h4>
                            <p>{mediaItem.author || ""}</p>
                          </div>
                          {isOwner && (
                            <button
                              className="delete-button"
                              onClick={() => handleRemoveMedia(mediaItem.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          {isEditing &&
            <AddContentModal
              listid={listid}
              refreshListPage={fetchListDetails}
              open={isEditing}
              setOpen={setIsEditing}
              handleClose={closeEdit}
            />
          }
        </div>
      ) : (
        <p>Loading list details...</p>
      )}
    </div>
  );
};

export default ListDetailsPage;