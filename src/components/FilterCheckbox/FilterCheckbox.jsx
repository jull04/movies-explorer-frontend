import './FilterCheckbox.css';

function FilterCheckbox({ changeShort, isCheck, firstEntrance }) {
  return (
    <div>
      <label className={`checkbox ${firstEntrance && 'checkbox_disabled'}`} for="checkbox">
        <input 
          className="checkbox__inp" 
          type="checkbox" id="checkbox" 
          checked={isCheck} 
          onChange={(evt) => changeShort(evt.target.checked)}
          disabled={firstEntrance}
        />
        <span className="checkbox__inner">
          Короткометражки
        </span>
      </label>
    </div>
  );
}

export default FilterCheckbox;