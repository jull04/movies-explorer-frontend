import './MoviesCard.css';
import { useLocation } from 'react-router-dom'
import { useState } from "react";

function MoviesCard() {
  const { pathname } = useLocation()
  const [isSaved, setSaved] = useState(false);

  function onClick() {
    setSaved(!isSaved);
  };

  return (
    <li className='movie-container'>
      <div className='movie-title-container'>
        <p className='movie-title'>В погоне за бенкси</p>
        <p className='movie-time'>0ч 42м</p>
      </div>
      <div className='movie-image'></div>
      {pathname === '/movies' && !isSaved && ( 
        <button className='movie-button' onClick={onClick}>Сохранить</button>
      )}
      {isSaved && ( 
      <button className='movie-button movie-button-saved' onClick={onClick}></button>
      )}
      {pathname === '/saved-movies' && (
      <button className='movie-delete-button'></button>
      )}
    </li>
  );
}

export default MoviesCard;