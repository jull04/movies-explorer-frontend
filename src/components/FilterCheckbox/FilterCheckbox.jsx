import './FilterCheckbox.css';

function FilterCheckbox({ changeShort, isCheck }) {
  return (
    <div>
      <label class="checkbox" for="checkbox">
        <input class="checkbox__inp" type="checkbox" id="checkbox" checked={isCheck} onChange={(evt) => changeShort(evt.target.checked)}/>
        <span class="checkbox__inner">
          Короткометражки
        </span>
      </label>
    </div>
  );
}

export default FilterCheckbox;