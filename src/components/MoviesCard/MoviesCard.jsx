import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";


function MoviesCard({ movie, savedMovies, onSave, onDelete }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  useEffect(() => {
    if (pathname === '/movies') {
      const isSaved = savedMovies.some(element => movie.id === element.movieId);
      setClick(isSaved);
    }
  }, [savedMovies, movie.id, setClick, pathname]);
  
  const handleSaveMovie = () => {
    setClick((prevClick) => !prevClick);
    onSave(movie);
  };

  const handleDeleteMovie = () => {
    onDelete(movie._id)
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    if (hours < 1) {
      return `0ч ${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className='movie-container'>
      <div className='movie-title-container'>
        <p className='movie-title'>{movie.nameRU}</p>
        <p className='movie-time'>{convertTime(movie.duration)}</p>
      </div>
      <Link to={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
      <img className='movie-image' src={pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.name}></img>
      </Link>
      {(pathname === '/movies') && (
      <button className={!click ? 'movie-button' : 'movie-button-saved'} onClick={handleSaveMovie}>{!click ? "Сохранить" : ""}</button> )}
      {pathname === '/saved-movies' && (
      <button className='movie-delete-button' type='button' onClick={handleDeleteMovie}></button>
      )}
    </li>
  );
}

export default MoviesCard;