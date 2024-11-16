import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import UserNavBar from '../UserNavbar';

interface ReviewEntity {
  id: number;
  body: string;
  date_created: string;
  rating: number;
  upVotes: number;
  downVotes: number;
}

const ListPage: React.FC = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [allContent, setAllContent] = useState([]);
  const location = useLocation();

  async function fetchData() {
    try {
      const reviewsResponse = await axios.get<ReviewEntity[]>(`http://localhost:8080/api/reviews/userId/${id}`);

      const reviewsWithMediaTitles = await Promise.all(
        reviewsResponse.data.map(async (review: any) => {
          const mediaResponse = await axios.get(`http://localhost:8080/api/media/id/${review.mediaId}`);
          const reviewDate = new Date(review.dateCreated);
          reviewDate.setHours(reviewDate.getHours() - 4);
          return {
            ...review,
            reviewDate,
            mediaTitle: mediaResponse.data.mediaTitle,  // Add the media title to the review object
            mediaType: mediaResponse.data.mediaType,
            mediaThumbnail: mediaResponse.data.thumbnail
          };
        })
      );

      const sortedReviews = reviewsWithMediaTitles.sort(
        (a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      );
      console.log(sortedReviews)
      setAllContent(sortedReviews);
    } catch (err) {
      console.error('Error fetching content data', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="content-page-container">
      <UserNavBar />
      <div className="content-page-tabs-container">
        <div className="content-page-tabs-header">
          <Link to={`/u/${id}/content`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content` ? 'active' : ''}`}>
            All
          </Link>
          <Link to={`/u/${id}/content/favorites`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content/favorites` ? 'active' : ''}`}>
            Favorites
          </Link>
          <Link to={`/u/${id}/content/tvshows`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content/tvshows` ? 'active' : ''}`}>
            TV Shows
          </Link>
          <Link to={`/u/${id}/content/movies`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content/movies` ? 'active' : ''}`}>
            Movies
          </Link>
          <Link to={`/u/${id}/content/videogames`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content/videogames` ? 'active' : ''}`}>
            Video Games
          </Link>
          <Link to={`/u/${id}/content/books`} className={`content-page-tab-item ${location.pathname === `/u/${id}/content/books` ? 'active' : ''}`}>
            Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListPage;