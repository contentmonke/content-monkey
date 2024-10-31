import { useEffect, useState } from 'react';
import axios from 'axios';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNavigate, useParams, useLocation, Link, Routes, Route } from 'react-router-dom';
import { CSS } from '@dnd-kit/utilities';
import { Container } from '@mui/material';
import ConfirmButton from './../../../components/ConfirmButton.tsx';

const SortableItem: React.FC<{ id: string; favorite: string }> = ({ id, favorite }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="content-page-review-item">
      <div className="content-page-review-header">
        <p className="content-page-review-title">{favorite}</p>
      </div>
      <Container disableGutters className="review-vote-container">
        {/* Additional content here if needed */}
      </Container>
    </li>
  );
};

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesResponse = await axios.get<string[]>(`http://localhost:8080/api/user/getFavorites?id=${id}`);
        setFavorites(favoritesResponse.data || []); // Fallback to an empty array if no data
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [id]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setFavorites((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateRankings = async () => {
    try {
      await axios.post('http://localhost:8080/api/user/setfavoritemedia', {
        id: parseInt(id),
        favorites: favorites,
      });

      alert('Rankings updated successfully!');
    } catch (error) {
      console.error('Error updating rankings:', error);
      alert('Failed to update rankings.');
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={favorites} strategy={verticalListSortingStrategy}>
        <ul className="content-page-reviews-list">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <SortableItem key={favorite} id={favorite} favorite={favorite} />
            ))
          ) : (
            <p>No favorites found.</p>
          )}
        </ul>
      </SortableContext>
      <ConfirmButton title="Update Rankings" onClick={updateRankings} />
    </DndContext>
  );
};

export default FavoritesPage;