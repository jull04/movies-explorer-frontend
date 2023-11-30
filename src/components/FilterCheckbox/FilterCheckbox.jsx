import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div >
      <label class="checkbox" for="checkbox">
        <input class="checkbox__inp" type="checkbox" id="checkbox"/>
        <span class="checkbox__inner">
          Короткометражки
        </span>
      </label>
    </div>
  );
}

export default FilterCheckbox;