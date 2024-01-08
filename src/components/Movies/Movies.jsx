import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { useState, useCallback, useEffect } from "react";
import { getMovies } from '../../utils/MoviesApi';

function Movies({ savedMovies, onSave, onDelete }) {

  const [apiMovies, setApiMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [inputSearch, setinputSearch] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)
  const [serverError, setServerError] = useState(false)


  const filter = useCallback((search, isCheck, movies) => {
    setinputSearch(search);
    localStorage.setItem('movie', JSON.stringify(search));
    localStorage.setItem('shorts', JSON.stringify(isCheck));
    localStorage.setItem('apimovies', JSON.stringify(movies));
    
    setFilteredMovies(movies.filter((movie) =>
      (movie.nameRU.toLowerCase().includes(search.toLowerCase()) && (isCheck ? movie.duration <= 40 : true))
    ));
  }, []);

  async function searchMovies(search) {
    try {
      if (apiMovies.length === 0) {
        setIsLoading(true);
        const res = await getMovies();
        setApiMovies(res);
        filter(search, isCheck, res);
        setServerError(false);
      } else {
        filter(search, isCheck, apiMovies);
      }
    } catch (err) {
      setServerError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.apimovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.apimovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setinputSearch(search)
      setIsCheck(isCheck)
      setApiMovies(movies)
      filter(search, isCheck, movies)
      setServerError(false)
      setFirstEntrance(false)
    }
  }, [filter])

  return (
    <section className="movies">
      <SearchForm
        searchMovies={searchMovies}
        movies={apiMovies}
        isCheck={isCheck}
        savedMovies={savedMovies}
        firstEntrance={firstEntrance}
        filter={filter}
        setIsCheck={setIsCheck}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        movies={filteredMovies}
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
        firstEntrance={firstEntrance}
        serverError={serverError}
      />
    </section>
  );
}

export default Movies;