import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link, Routes, Route } from 'react-router-dom';
import UserNavBar from '../UserNavbar';
import './ContentPage.css';

const ContentPage: React.FC = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [allContent, setAllContent] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [videoGames, setVideoGames] = useState([]);
  const [books, setBooks] = useState([]);
  const location = useLocation();

  async function fetchData() {
    try {
      // Example API calls - update with actual endpoints
      /*
      const allContentResponse = await axios.get('http://localhost:8080/api/user/content/all');
      const favoritesResponse = await axios.get('http://localhost:8080/api/user/content/favorites');
      const tvShowsResponse = await axios.get('http://localhost:8080/api/user/content/tvshows');
      const moviesResponse = await axios.get('http://localhost:8080/api/user/content/movies');
      const videoGamesResponse = await axios.get('http://localhost:8080/api/user/content/videogames');
      const booksResponse = await axios.get('http://localhost:8080/api/user/content/books');

      setAllContent(allContentResponse.data);
      setFavorites(favoritesResponse.data);
      setTvShows(tvShowsResponse.data);
      setMovies(moviesResponse.data);
      setVideoGames(videoGamesResponse.data);
      setBooks(booksResponse.data); 
      */
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
        <div className="content-page-tab-content">
          <Routes>
            <Route path="/" element={
              <ul className="content-page-contentlist">
                {allContent.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
            <Route path="favorites" element={
              <ul className="content-page-contentlist">
                {favorites.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
            <Route path="tvshows" element={
              <ul className="content-page-contentlist">
                {tvShows.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
            <Route path="movies" element={
              <ul className="content-page-contentlist">
                {movies.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
            <Route path="videogames" element={
              <ul className="content-page-contentlist">
                {videoGames.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
            <Route path="books" element={
              <ul className="content-page-contentlist">
                {books.map((content: any, i: number) => (
                  <li key={i} className="content-page-contentitem">{content.title}</li>
                ))}
              </ul>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;