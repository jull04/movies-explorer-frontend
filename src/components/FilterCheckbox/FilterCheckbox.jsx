import './FilterCheckbox.css';

function FilterCheckbox({ changeShort }) {
  return (
    <div>
      <label class="checkbox" for="checkbox">
        <input class="checkbox__inp" type="checkbox" id="checkbox" onChange={() => changeShort()}/>
        <span class="checkbox__inner">
          Короткометражки
        </span>
      </label>
    </div>
  );
}

export default FilterCheckbox;