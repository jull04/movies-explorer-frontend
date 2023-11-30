import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__container' name='search' noValidate>
        <input className='search__input' placeholder='Фильм'></input>
        <button className='search__button' type='submit'>Поиск</button>
      </form>
      <div className='search__filter-container'>
        <FilterCheckbox/>
      </div>
    </section>
  );
}

export default SearchForm;