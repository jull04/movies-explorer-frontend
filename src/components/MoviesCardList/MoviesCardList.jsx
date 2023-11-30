import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom'

function MoviesCardList() {

  const { pathname } = useLocation()

  return (
    <section className="movies-container">
      <ul className="movies-list">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </ul>
      {pathname === '/movies' && (
      <button className="movies__more-button">Еще</button>
      )}
    </section>
  );
}

export default MoviesCardList;