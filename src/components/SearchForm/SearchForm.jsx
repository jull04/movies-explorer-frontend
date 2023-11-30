import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <div className='search__container'>
        <input className='search__input' placeholder='Фильм'></input>
        <button className='search__button' type='submit'>Поиск</button>
      </div>
      <div className='search__filter-container'>
        <FilterCheckbox/>
      </div>
    </section>
  );
}

export default SearchForm;