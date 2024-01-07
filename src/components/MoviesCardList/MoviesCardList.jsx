import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Preloader from '../Preloader/Preloader'
import {
  BigScreen,
  NormalScreen,
  SmallScreen,
  InitOneScreen,
  InitTwoScreen,
  InitThreeScreen,
  InitFourScreen,
  StepBig,
  StepNormal,
  StepSmall,
} from "../../utils/constants";

function MoviesCardList({ savedMovies, movies, isLoading, onSave, onDelete, serverError, firstEntrance }) {

  const { pathname } = useLocation()

  const [count, setCount] = useState('')
  const fact = movies.slice(0, count)

  function renderMoreMovies() {
    const count = { init: InitOneScreen, step: StepBig }
    if (window.innerWidth < BigScreen) {
      count.init = InitTwoScreen
      count.step = StepNormal
    }
    if (window.innerWidth < NormalScreen) {
      count.init = InitThreeScreen
      count.step = StepSmall
    }
    if (window.innerWidth < SmallScreen) {
      count.init = InitFourScreen
      count.step = StepSmall
    }
    return count
  }

  function openMore() {
    setCount(count + renderMoreMovies().step)
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(renderMoreMovies().init)
      function printResize() {
        if (window.innerWidth >= StepBig) {
          setCount(renderMoreMovies().init)
        }
        if (window.innerWidth < StepBig) {
          setCount(renderMoreMovies().init)
        }
        if (window.innerWidth < NormalScreen) {
          setCount(renderMoreMovies().init)
        }
        if (window.innerWidth < SmallScreen) {
          setCount(renderMoreMovies().init)
        }
      }
      window.addEventListener('resize', printResize)
      return () => window.removeEventListener('resize', printResize)
    }
  }, [pathname, movies])

  return (
    <section className="movies-container">
      <ul className="movies-list">
      {isLoading ? <Preloader/> :
      (pathname === '/movies' && fact.length !== 0) ?
      fact.map(movie => {
        return (
          <MoviesCard
            key={movie.id}
            movie={movie}
            savedMovies={savedMovies}
            onSave={onSave}
          />
        )
      }) : (pathname === '/saved-movies' && movies.length !== 0) ?
      movies.map(movie => {
        return (
          <MoviesCard
            key={movie._id}
            movie={movie}
            onDelete={onDelete}
          />
        )
      }) : serverError ?
      <span className='gallery__serch-error'>
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.
      </span>
      : !firstEntrance ?
      <span className='gallery__serch-error'>Ничего не найдено</span>
      : pathname === '/movies' ?
      <span className='gallery__serch-error'>Чтобы увидеть список фильмов выполните поиск</span>
      :  
      <span className='gallery__serch-error'>Нет сохранённых фильмов</span>
    }
      </ul>
      {pathname === '/movies' && (
      <button className={`movies__more ${count >= movies.length && 'movies__more_hidden'}`} onClick={openMore}>Еще</button>
      )}
    </section>
  );
}

export default MoviesCardList;