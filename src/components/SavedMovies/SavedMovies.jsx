import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useCallback, useState, useEffect } from "react";

function SavedMovies({ savedMovies, onDelete }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const searchCondition = (movie, search, isCheck) => {
    const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase());
    return isCheck ? (searchName && movie.duration <= 40) : searchName;
  };
  
  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search);
    setFilteredMovies(movies.filter((movie) => searchCondition(movie, search, isCheck)));
  }, []);

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isCheck, savedMovies)
  }

  useEffect(() => {
    if (savedMovies.length === 0 || searchedMovie.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchedMovie, isCheck, savedMovies)
  }, [filter, savedMovies, isCheck, searchedMovie])

  return (
    <section className='saved-movies'>
      <SearchForm
        isCheck={isCheck}
        movies={savedMovies}
        setIsCheck={setIsCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        firstEntrance={firstEntrance}
        filter={filter}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </section>
  );
}

export default SavedMovies;