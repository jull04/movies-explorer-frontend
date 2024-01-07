import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import useFormValidation from '../../hooks/useFormValidation';
import { useState, useEffect } from "react";

function SearchForm({ searchMovies, isCheck, setIsCheck, movies, filter}) {

  const {handleChange, reset, values, isValid} = useFormValidation();
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    // Восстанавливаем значение поиска из локального хранилища при загрузке компонента
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      reset({ search: savedSearchValue });
    }
  }, []);


  function handleSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
    searchMovies(evt.target.search.value)
    setSearchError("");
    localStorage.setItem('searchValue', evt.target.search.value);
  } else {
    setSearchError('Введите ключевое слово');
  }
  }

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(values.search, false, movies)
    } else {
      setIsCheck(true)
      filter(values.search, true, movies)
    }
  }

  return (
    <section className='search'>
      <form className='search__container' name='search' onSubmit={handleSubmit} isValid={isValid} noValidate>
        <input 
          className='search__input' 
          placeholder='Фильм'
          type='text'
          name='search'
          value={values.search || ""}
          onChange={(evt) => {
            handleChange(evt)
            setSearchError('')
          }}
        >
        </input>
        <button 
          className='search__button'
          type='submit'
          >Поиск</button>
      </form>
      <span className='input__error'>{searchError}</span>
      <div className='search__filter-container'>
        <FilterCheckbox
          changeShort={changeShort} 
        />
      </div>
    </section>
  );
}

export default SearchForm;